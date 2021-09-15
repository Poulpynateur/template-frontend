/**** Interface building ****/
const data_attributes = {
    "each": function (node, data, template) {
        for (let k in data) {
            if (!data[k]["@ignore"])
            {
                apply_template(node, template, data[k]);
            }
        }
    },
    "attr": function (node, data, attr) {
        node.setAttribute(attr, data);
    },
    "text": function (node, data) {
        node.appendChild(document.createTextNode(data));
    },
    "children": function (node, data) {
        search_template(node, data);
    }
}

function data_from_path(path, data) {
    if (path)
        return data[path]
    return data;
}

function apply_data_attribute(node, data) {
    for (let attribute in data_attributes) {
        if (attribute in node.dataset) {
            let attr = node.dataset[attribute].split(':');
            data_attributes[attribute](node, data_from_path(attr[0], data), attr[1])

            node.removeAttribute("data-" + attribute);
        }
    }
}

// Recursive iteration on each chilrends
function for_each_children(node, callback, data) {
    if (node.children.length) {
        for (let i = 0; i < node.children.length; i++) {
            for_each_children(node.children[i], callback, data)
            callback(node.children[i], data)
        }
    }
}

function apply_template(parent, template_name, data) {
    let template = document.querySelector(`[data-template-name="${template_name}"]`);
    let clone = template.content.cloneNode(true);

    for_each_children(clone, apply_data_attribute, data);

    parent.appendChild(clone);
}

function search_template(parent, data) {
    for (let key in data) {
        apply_template(parent, key, data[key]);
    }
}

function reset(parent, data)
{
    parent.innerHTML = "";
    search_template(parent, data);
}

module.exports = {
    reset
};