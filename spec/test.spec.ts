import demo from '#utam-pageObjects/demo'
import { load as loadEnhanced } from '../utam-enhanced.ts'

describe("reproduce truncate error stack", () => {
    it("Case 1: Getting no existing element directly using getter ", async () => {
        await browser.url("https://www.shopsite.com/demo.html")
        let demoPage = await loadEnhanced(demo)
        let input = await demoPage.getUserNameInput()
    })
    /**
     * hello
     */
    it("Case 2: Getting no existing element inside a method", async () => {
        await browser.url("https://www.shopsite.com/demo.html")
        let demoPage = await loadEnhanced(demo)
        expect(1).toEqual(2)
    })
    fit("Case 3: Getting no existing inside a predicate", async () => {
        await browser.url("https://www.shopsite.com/demo.html")
        let demoPage = await loadEnhanced(demo)
        await demoPage.login()
    })
    fit("Case 4: Wait for visibility of hidden search input", async () => {
        await browser.url("https://www.shopsite.com/demo.html")
        let demoPage = await loadEnhanced(demo)
        await demoPage.waitForSearchInputToVisible()
    })
    fit("Case 5: Get hidden element ,then wait for visibility", async () => {
        await browser.url("https://www.shopsite.com/demo.html")
        let demoPage = await loadEnhanced(demo)
        let searchInput = await demoPage.getSearchInput()
        await searchInput.waitFor(()=>{
            searchInput.waitForVisible()
        },{
            message: "I am freaking out"
        })
       
    })




})