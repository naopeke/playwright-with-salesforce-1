import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Salesforce', ()=>{

    const loginUrl = process.env.LOGIN_URL;
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    //const securityToken = process.env.SECURITY_TOKEN;
    switch(true){
        case !loginUrl:
            throw new Error('LOGIN_URL is not defined');
        case !username:
            throw new Error('USERNAME is not defined');
        case !password:
            throw new Error('PASSWORD is not defined');
        //case !securityToken:
        //    throw new Error('SECURITY_TOKEN is not defined');
        default:
            break;
    }

    test.beforeEach(async ({ page })=>{
        await page.goto(process.env.LOGIN_URL!);
        await page.fill('#username', username);
        await page.fill('#password', password);
        await page.click('#Login');

        await Promise.all([
            page.waitForURL(/.*lightning\/page\/home.*/),
            page.click('#Login')
        ])
    })
    
    test('After login', async ({ page })=>{
        await expect(page).toHaveURL(/.*lightning\/page\/home.*/);
    })


})