import "./scss/style.scss";

const menu = require('./js/menu.js');
const HTML_builder = require('./js/HTML_builder.js');
const HTTP = require('./js/HTTP.js');

let data = null;

/**** Init ****/

HTTP.get("favorites", (response) => {
    data = response;
    menu.reset_menu_HTML(data);
    HTML_builder.reset(document.getElementById("app"), data)
})

/**** DOM events ****/

document.querySelectorAll('[aria-label="Close"]').forEach((item) => {
    item.addEventListener('click', () => {
        document.getElementById("post_modal").classList.remove('active');
    })
});
document.getElementById("more_btn").addEventListener('click', () => {
    document.getElementById("post_modal").classList.add('active');
})
document.getElementById("send_btn").addEventListener('click', send_favorite)

/**** Form ****/
function toggle_error(id, error)
{
    if (error)
        document.getElementById(id).classList.add('has-error');
    else
        document.getElementById(id).classList.remove('has-error');
}

function form_serialize()
{
    const auth = {
        "username": document.getElementById("input_username").value,
        "password": document.getElementById("input_password").value
    }
    const favorite = {
        "title": document.getElementById("input_title").value,
        "url": document.getElementById("input_url").value,
        "thumbnail": document.getElementById("input_thumbnail").value,
        "tags": document.getElementById("input_tags").value.split(';'),
    }
    return {auth, favorite};
}

function send_favorite()
{
    // Reset
    toggle_error('auth_group', false);
    toggle_error('form_group', false);

    const {auth, favorite} = form_serialize();
    HTTP.post('favorites', (status, response) => {
        if (status == 401)
            toggle_error('auth_group', true);
        else if (status != 200)
        {
            toggle_error('form_group', true);
            console.error(`Error occured (${status}) : ${response.msg}`);
        }
    }, favorite, auth);
}