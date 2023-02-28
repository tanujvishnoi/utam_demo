import demo from "@utam-pageObjects/demo"

describe("reproduce truncate error stack", () => {


    /**
     * Getting non-existing element directly 
     */
    it("Case 1: Getting no existing element directly using getter ", async () => {
        await browser.url("https://www.shopsite.com/demo.html")
        let demoPage = await utam.load(demo)
        let input = await demoPage.getUserNameInput()
    })



    /**
    * Getting non-existing element using utam method 
    */
    it("Case 2: Getting no existing element inside a method", async () => {
        await browser.url("https://www.shopsite.com/demo.html")
        let demoPage = await utam.load(demo)
        await demoPage.clickUserName()
    })

    /**
     * 
     * Getting non-existing element inside a predicate
     */

    it("Case 3: Getting no existing inside a predicate", async () => {
        await browser.url("https://www.shopsite.com/demo.html")
        let demoPage = await utam.load(demo)
        await demoPage.login()
    })

    /**
     * 
     * wait for hidden element visibility 
     */

    it("Case 4: Wait for visibility of hidden search input", async () => {
        await browser.url("https://www.shopsite.com/demo.html")
        let demoPage = await utam.load(demo)
        await demoPage.waitForSearchInputToVisible()
    })

    
    /**
     * 
     * get hidden element then wait for visibility 
     */

    it("Case 5: Get hidden element ,then wait for visibility", async () => {
        await browser.url("https://www.shopsite.com/demo.html")
        let demoPage = await utam.load(demo)
        let searchInput = await demoPage.getSearchInput()
        await searchInput.waitForVisible();
        await searchInput.waitFor(()=>{
            searchInput.waitForVisible()
        })
       
    })




})