const HTML_builder = require('./HTML_builder.js');

let site_content = null;
const active_tags = [];

// Extract all tags from favorites
function get_tags(favorites)
{
    let tags = {};
    for (let favorite of favorites)
        for (let tag of favorite.tags)
            tags[tag] = 1;

    return {
        "tags-menu": Object.keys(tags).sort()
    };
}

// Hangle click on tag chips
function tag_handle_click(event)
{
    let target = event.target;
    target.classList.toggle("active");

    if (target.classList.contains("active"))
    {
        active_tags.push(target.getAttribute("value"));
    }
    else
    {
        let index = active_tags.indexOf(target.getAttribute("value"))
        if (index !== -1)
            active_tags.splice(index, 1);
    }
    HTML_builder.reset(document.getElementById("app"), apply_filter(site_content))
}

// Check if an array have all elements of another control array
function have_all(target, control)
{
    return control.every(v => target.includes(v));
}

// Apply ignored label on filterd row since deleting them would be a pain
function apply_filter(data)
{
    for(let favorite of data.favorites)
    {
        favorite["@ignore"] = false;
        if (active_tags.length && !have_all(favorite.tags, active_tags))
            favorite["@ignore"] = true;
    }
    return data;
}

// Reset HTML 
function reset_menu_HTML(data)
{
    site_content = data;
    HTML_builder.reset(document.getElementById("menu"), get_tags(site_content.favorites))
    document.querySelectorAll('.menu .chip').forEach((item) => {
        item.addEventListener('click', tag_handle_click)
    });
}

module.exports = {
    reset_menu_HTML
};