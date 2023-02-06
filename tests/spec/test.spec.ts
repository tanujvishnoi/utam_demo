import demo from "@utam-pageObjects/demo"

describe("reproduce truncate error stack", ()=>{

    it("try to perform task on invalid elements", async ()=>{
        await browser.url("https://www.shopsite.com/demo.html")
        let demoPage = await utam.load(demo)
        await demoPage.login()
    })
})