export default function repaint_avatar(Data2Serv) {
const path_avatar_man = 'images/avatar_img/sprite_avatar_man.svg'
const path_avatar_other = '../images/avatar_img/sprite_avatar_other.svg'
const clone_avatar_svg_path = {ear: '', skin: '', chin: '', mouth: '', eye: '', nose: '', hair: ''}
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
    clone_avatar_svg_path.ear = `${path_avatar_man}#ear${Data2Serv.ear + 1}`;
    clone_avatar_svg_path.chin = `${path_avatar_man}#chin${Data2Serv.chin + 1}`;
    clone_avatar_svg_path.mouth = `${path_avatar_man}#mouth${Data2Serv.mouth + 1}`;
    clone_avatar_svg_path.eye = `${path_avatar_man}#eye${Data2Serv.eye + 1}`;
    clone_avatar_svg_path.nose = `${path_avatar_man}#nose${Data2Serv.nose + 1}`;
    clone_avatar_svg_path.hair = `${path_avatar_man}#hair${Data2Serv.hair + 1}`;

    return clone_avatar_svg_path;
}