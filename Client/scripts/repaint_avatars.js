export default function repaint_avatar(avatar, log) {

const path_avatar_man = '../images/avatar_img/sprite_avatar_man.svg'
const path_avatar_other = '../images/avatar_img/sprite_avatar_other.svg'
const clone_avatar_svg_path = {
    ear: '', skin: '', chin: '', mouth: '', eye: '', nose: '', hair: ''   
}
    switch (avatar.skin) {
        case 0 : {
            clone_avatar_svg_path.skin = '#FFCCA7';
            break;
        }
        case 1 : {
            clone_avatar_svg_path.skin = '#EE873E';
            break;
        }
        case 2 : {
            clone_avatar_svg_path.skin = '#FFA8A9';
            break;
        }
        case 3 : {
            clone_avatar_svg_path.skin = '#C5C8C9';
            break;
        }
        case 4 : {
            clone_avatar_svg_path.skin = '#A35138';
            break;
        }
    }
    
    clone_avatar_svg_path.ear = `${path_avatar_man}#ear${avatar.ear + 1}`;
    clone_avatar_svg_path.chin = `${path_avatar_man}#chin${avatar.chin + 1}`;
    clone_avatar_svg_path.mouth = `${path_avatar_man}#mouth${avatar.mouth + 1}`;
    clone_avatar_svg_path.eye = `${path_avatar_man}#eye${avatar.eye + 1}`;
    clone_avatar_svg_path.nose = `${path_avatar_man}#nose${avatar.nose + 1}`;
    clone_avatar_svg_path.hair = `${path_avatar_man}#hair${avatar.hair + 1}`;
    
    console.log('render ' + log);

    return clone_avatar_svg_path;
}
