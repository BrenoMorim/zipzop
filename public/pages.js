export const pages = {
    "register": `
        <h1>Register</h1>
        <form class="form">
            <div>
                <label for="nickname" class="form-label">Nickname:</label>
                <input autofocus autocomplete="off" class="form-control" type="nickname" name="nickname" id="nickname">
            </div>
            <div>
                <label for="email" class="form-label">Email:</label>
                <input autocomplete="off" class="form-control" type="email" name="email" id="email" placeholder="name@domain.com">
            </div>
            <div>
                <label for="password" class="form-label">Password:</label>
                <input type="password" name="password" id="password" class="form-control" placeholder="Your password">
            </div>
            <input type="submit" value="Register" class="btn btn-primary form__submit">
        </form>
    `,
    "login": `
        <h1>Login</h1>
        <form class="form">
            <div>
                <label for="email" class="form-label">Email:</label>
                <input autofocus autocomplete="off" class="form-control" type="email" name="email" id="email" placeholder="name@domain.com">
            </div>
            <div>
                <label for="password" class="form-label">Password:</label>
                <input type="password" name="password" id="password" class="form-control" placeholder="Your password">
            </div>
            <input type="submit" value="Sign in" class="btn btn-primary form__submit">
        </form>
    `,
    "index": `
        <button class="btn btn-info" id="login">Log in</button>
        <button class="btn btn-info" id="register">Register</button>
    `
};