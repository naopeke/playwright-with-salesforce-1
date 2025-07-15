import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ override: true }); //前の値があれば上書き

test.describe('Salesforce', ()=>{
    const loginUrl = process.env.SALESFORCE_LOGIN_URL!;
    const username = process.env.SALESFORCE_USERNAME!;
    const password = process.env.SALESFORCE_PASSWORD!;
    
    test.beforeEach('Login', async({page})=>{
        await page.goto(loginUrl);
        await page.fill('#username', username);
        await page.fill('#password', password);
        await page.click('#Login');
        await expect(page).toHaveURL(/.*lightning\/page\/home.*/);
    })

    test('Choose App', {tag:'@smoke'}, async({page})=>{
        const modalButton = page.getByRole('button').and(page.getByTitle('Allow'));
        if(modalButton){
            await page.click('modalButton');
        }
     
        const gridMenuIcon = page.locator('button.slds-button.slds-context-bar__button');
        await page.click('gridMenuIcon');
    })

})