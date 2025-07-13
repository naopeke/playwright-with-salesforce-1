import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ override: true });

test.describe('Salesforce', ()=>{
    const loginUrl = process.env.SALESFORCE_LOGIN_URL!;
    const username = process.env.SALESFORCE_USERNAME!;
    const password = process.env.SALESFORCE_PASSWORD!;
    console.log('Login Url:',loginUrl);
    console.log('Username:',username);

    
    test('test', async({page})=>{
        await page.goto(loginUrl);
        await page.fill('#username', username);
        await page.fill('#password', password);
        await page.click('#Login');
        await expect(page).toHaveURL(/.*lightning\/page\/home.*/);
    })


})