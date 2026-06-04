from datetime import datetime
from typing import Optional
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, Field, EmailStr, ConfigDict
import secrets

security = HTTPBearer()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Message(BaseModel):
    id: int
    fixTime: datetime = Field(default_factory=datetime.now)
    message: str
    status: int = 0


# Полная модель пользователя (для хранения в myUsers)
class UserSchema(BaseModel):
    id: int
    login: str = Field(min_length=3, max_length=32)
    password: str = Field(min_length=1, max_length=32)
    token: str = ""
    email: EmailStr | None = None
    role: str = "user"
    last_role: str = "user"
    nik_name: str = Field(min_length=3, max_length=32)
    gender: int = Field(ge=0, le=2, default=0)
    show_meta: bool = True
    avatars: list[int] = Field(default_factory=lambda: [0] * 15)
    text_status: Optional[str] = Field(default=None, max_length=16)
    birth: datetime | None = None
    deadline: datetime | None = None
    registration: datetime
    last_visit: datetime
    status: int = 1
    Country: str = ""
    City: str = ""
    buf_msg: list[Message] = Field(default_factory=list)
    model_config = ConfigDict(extra='forbid')

# Модель для регистрации (без id, token, role, registration и т.д.)
class UserCreate(BaseModel):
    login: str = Field(min_length=3, max_length=32)
    password: str = Field(min_length=1, max_length=32)
    email: EmailStr | None
    nik_name: str = Field(min_length=3, max_length=32)
    gender: int = Field(ge=0, le=2)
    show_meta: bool = False
    avatars: list[int] = Field(default_factory=lambda: [0] * 9)
    text_status: Optional[str] = Field(default=None, max_length=16)
    birth: datetime | None = None
    deadline: datetime | None = None
    
    model_config = ConfigDict(extra='forbid')


class LoginRequest(BaseModel):
    login: str = Field(min_length=3, max_length=32)
    password: str = Field(min_length=1, max_length=32)


myUsers = []


def generate_token():
    return secrets.token_urlsafe(32)


def get_next_id():
    return max((u.id for u in myUsers), default=0) + 1


# Создаём администратора (используем UserSchema)
myUsers.append(UserSchema(
    id=0,
    login="admin",
    password="1234",
    token="",
    email="admin@example.com",
    role="admin",
    last_role="admin",
    nik_name="Administrator",
    gender=1,
    show_meta=True,
    avatars=[1, 3, 1, 2, 4, 2, 5, 2, 1],
    text_status="Hello world!",
    birth=datetime(2000, 1, 1),
    deadline=datetime(2081, 12, 6),
    registration=datetime.now(),
    last_visit=datetime.now(),
    status=1,
    buf_msg=[]
))


def check_user(usr: UserCreate):
    for user in myUsers:
        if user.login == usr.login or user.nik_name == usr.nik_name:
            print('такой пользователь существует')
            return True
    print('Добавляем нового пользователя')
    return False


def check_login(login: LoginRequest):
    for user in myUsers:
        if user.login == login.login and user.password == login.password:
            print('Залогинился')
            user.token = generate_token()
            return user.token
    print('Не залогинился')
    return None


@app.get("/me")
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    current_user = next((u for u in myUsers if u.token == token), None)
    if not current_user:
        raise HTTPException(status_code=401, detail="Неверный токен")
    user_data = current_user.model_dump()
    user_data.pop('password', None)
    return user_data


@app.post("/new-reg")
async def registration(usr: UserCreate):
    if check_user(usr):
        raise HTTPException(status_code=409, detail="Пользователь уже существует")

    new_user = UserSchema(
        id=get_next_id(),
        login=usr.login,
        password=usr.password,
        token="",  # при регистрации токен пустой
        email=usr.email,
        role="user",
        last_role="user",
        nik_name=usr.nik_name,
        gender=usr.gender,
        show_meta=usr.show_meta,
        avatars=usr.avatars,
        text_status=usr.text_status,
        birth=usr.birth,
        deadline=usr.deadline,
        registration=datetime.now(),
        last_visit=datetime.now(),
        status=1,
        buf_msg=[]
    )
    myUsers.append(new_user)
    return {"пользователь": "создан", "id": new_user.id}


@app.post("/log-in")
async def log_in(login: LoginRequest):
    result = check_login(login)
    if result:
        return {"пользователь": "залогинился", "token": result}
    raise HTTPException(status_code=401, detail="Неверный логин или пароль")


@app.post("/logout")
async def logout(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    current_user = next((u for u in myUsers if u.token == token), None)
    if not current_user:
        raise HTTPException(status_code=401, detail="Неверный токен")

    current_user.token = ""
    print(f"👋 Пользователь {current_user.login} вышел из аккаунта")
    return {"message": "Вы успешно вышли из аккаунта"}


@app.get("/admin/users")
async def get_all_users(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    current_user = next((u for u in myUsers if u.token == token), None)

    if not current_user:
        raise HTTPException(status_code=401, detail="Неверный токен")

    # Проверка прав администратора
    if current_user.role.lower() != "admin":
        raise HTTPException(status_code=403, detail="Недостаточно прав. Только для администратора")

    users_list = []
    for user in myUsers:
        user_dict = user.model_dump()
        user_dict.pop('password', None)
        users_list.append(user_dict)

    return {"total": len(users_list), "users": users_list}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)