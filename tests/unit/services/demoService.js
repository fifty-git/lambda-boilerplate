"use strict"

const mocha = require("mocha")
const chai = require("chai")
const proxyquire = require("proxyquire")
const assert = chai.assert

describe("demoService", () => {
  const demoModelFixture = require("../../fixtures/demoModels")
  const parseKeys = result => ({
    "tag_id": result.tagid,
    "tag_name": result.tagname,
    "tag_description": result.tagdescription,
    "tag_priority": result.tagpriority,
    "tag_color": result.tagcolor 
  })
  let demoService = null
  let data = null
  beforeEach(() => {
    demoService = proxyquire("../../../services/demoService", {
      "../models/demoModels": demoModelFixture 
    })
    data = {
      "tagid": 1,
      "tagname": "faketag",
      "tagdescription": "faketag description",
      "tagpriority": 1,
      "tagcolor": "#fff"
    }
  })

  describe("#insertTagService", async () => {
    it("should return an inserted tag", async () => {
      let insertedTag = await demoService.insertTagService(data)
      assert.deepEqual(
        insertedTag, 
        { error: false, insertId: data.tagid }, 
        "should be the same"
      )
    })
  })

  describe("#getTagService", () => {
    it("should return a selected tag", async () => {
      let foundTag = await demoService.getTagService(data.tagid)
      assert.deepEqual(
        foundTag, 
        { error: false, results: parseKeys(data) }, 
        "should be the same"
      )
    })
  })

  describe("#updateTagService", async () => {
    it("should update a selected tag", async () => {
      let updateData = Object.assign(data, { "tagdescription": "updated fake tag desc" })
      let updatedTag = await demoService.updateTagService(updateData)
      let parsedData = {
        "tag_id": updateData.tagid,
        "tag_name": updateData.tagname,
        "tag_description": updateData.tagdescription,
        "tag_priority": updateData.tagpriority,
        "tag_color": updateData.tagcolor
      }
      assert.deepEqual(updatedTag, {error: false, affectedRows: parsedData}, "should be the same")
    })
  })
})
