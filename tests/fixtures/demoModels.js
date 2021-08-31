'use strict';

const cart_tags = [] 
const cart_tag = {
  tag_id: 1,
  tag_name: "test_tag",
  tag_description: "test fixture tag",
  tag_priority: 1,
  tag_color: "ffffff"
}

function extendObject(object) {
  const clone = Object.assign(
    { tag_id: Math.floor(Math.random() * (100 - 1) + 1) },
    cart_tag
  )

  return Object.assign(clone, object)
}

async function getTag(tagId) {
  if(!tagId) {
    return { error: true, message: "undefined tagId" }
  }

  let cart = cart_tags.filter(tag => tag.tag_id === tagId) || false

  return { 
    error: false, 
    results: cart.pop()
  };
}

async function insertTag(data) {
  const querydata = {
    tag_id: data.tagid,
    tag_name: data.tagname,
    tag_description: data.tagdescription,
    tag_priority: data.tagpriority,
    tag_color: data.tagcolor,
  }
  const index = cart_tags.push(querydata) - 1

  return {
    error: false, 
    insertId: cart_tags[index].tag_id 
  }
}

async function updateTag(data) {
  const querydata = Object.assign({}, {
    tag_id: data.tagid,
    tag_name: data.tagname,
    tag_description: data.tagdescription,
    tag_priority: data.tagpriority,
    tag_color: data.tagcolor
  })
  const affectedRows = cart_tags.find(tag => tag.tag_id === data.tagid)

  console.log(`affectedRows:${affectedRows}`)
  Object.assign(affectedRows, querydata)

  return { error: false, affectedRows }
}

module.exports = { getTag, insertTag, updateTag, extendObject, cart_tags }
