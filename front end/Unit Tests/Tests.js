import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';
let sessionGet=ClientFunction(key =>
    sessionStorage.getItem(key));

fixture `Login Page Tests`
    .page `file:///C:/Users/Kids%20computer/Desktop/Git/Ch4/front%20end/login.html`;

test('Login Page:Valid Login', async t => {
    await t
    .typeText('#username', 'abc')
    .typeText('#password', '123')
    .click('#login-button')

    // Use the assertion to check if the login page redirected to the user homepage
    .expect(Selector('#page-title').innerText).eql('iReporter | User Homepage');
});


test('Invalid Login:No Page Redirect', async t => {
    await t
    .typeText('#username', 'bad')
    .typeText('#password', 'login')
    .click('#login-button')

    // Use the assertion to check if the login page did not redirect to the user homepage
    .expect(Selector('#page-title').innerText).eql('iReporter | Login');
});

test('Invalid Login:Dsiplay Error Message', async t => {
    await t
    .typeText('#username', 'bad')
    .typeText('#password', 'login')
    .click('#login-button')

    // Use the assertion to check if the error message displayed
    .expect(Selector('#login-error').innerText).eql('Bad credentials.Login failed');
});

test('Valid Login:Store "user" in Session Storage', async t => {
    await t
    .typeText('#username', 'abc')
    .typeText('#password', '123')
    .click('#login-button')

    // Use the assertion to check if the username was stored as session data in the browser
    .expect(sessionGet('user')).eql('abc');
});

fixture `User Homepage Tests`
    .page `file:///C:/Users/Kids%20computer/Desktop/Git/Ch4/front%20end/login.html`;

test('Create Incident:Valid Post', async t => {
    await t
    .typeText('#username', 'abc')
    .typeText('#password', '123')
    .click('#login-button')
    .click('#posting-link')
    .typeText('#message','TestCafe')
    .typeText('#location','45N,30E')
    .click('#post-incident')

    // Use the assertion to check if the login page redirected to the user homepage
    .expect(Selector('#successMessage').innerText).contains('Success! Created redflag record');
});


