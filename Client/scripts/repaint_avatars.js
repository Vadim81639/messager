export default function repaint_avatar(Data2Serv) {
const path_avatar_man = 'images/avatar_img/sprite_avatar_man_hd.svg'
const path_avatar_woman = 'images/avatar_img/sprite_avatar_woman_hd.svg'
const path_avatar_other = 'images/avatar_img/sprite_avatar_other.svg'
let path = Data2Serv.gender === 0 ? path_avatar_man : path_avatar_woman
const clone_avatar_svg_path = {head: '', body: '', dress: '', ear: '', skin: '', chin: '', mouth: '', eye: '', nose: '', hair: ''}
    switch (Data2Serv.skin) {
        case 0 : {
            clone_avatar_svg_path.skin = '#FFCCA7';
            break;}
        case 1 : {
            clone_avatar_svg_path.skin = '#EE873E';
            break;}
        case 2 : {
            clone_avatar_svg_path.skin = '#FFA8A9';
            break;}
        case 3 : {
            clone_avatar_svg_path.skin = '#C5C8C9';
            break;}
        case 4 : {
            clone_avatar_svg_path.skin = '#A35138';
            break;}
    }                                                   
    clone_avatar_svg_path.head = `${path}#head${Data2Serv.head + 1}`; // body   
    clone_avatar_svg_path.body = `${path}#body${Data2Serv.body + 1}`; // body                    
    clone_avatar_svg_path.dress = `${path}#dress${Data2Serv.dress + 1}`; // body    
    clone_avatar_svg_path.ear = `${path}#ear${Data2Serv.ear + 1}`; // ухо
    clone_avatar_svg_path.chin = `${path}#chin${Data2Serv.chin + 1}`; // подбородок
    clone_avatar_svg_path.mouth = `${path}#mouth${Data2Serv.mouth + 1}`; // рот
    clone_avatar_svg_path.eye = `${path}#eye${Data2Serv.eye + 1}`; // глаза
    clone_avatar_svg_path.nose = `${path}#nose${Data2Serv.nose + 1}`; // нос
    clone_avatar_svg_path.hair = `${path}#hair${Data2Serv.hair + 1}`; // причёска

    return clone_avatar_svg_path;
}