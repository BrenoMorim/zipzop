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
        <h1>Welcome to ZipZop!</h1>
        <h2>Speak privately with anyone, anytime and anywhere!</h2>
        <div>
            <h3>You can create an account if you're new here</h3>
            <button class="btn btn-warning" id="register">Register</button>

            <h3 class="mt-3">Or log in if you own an account</h3>
            <button class="btn btn-success" id="login">Log in</button>
        </div>
    `,
    "homepage": `
        <h1 id="greet-user"></h1>
        <h2>Your chats</h2>
        <button id="start-chat" class="btn btn-dark">Start new chat</button>
        <ul class="chats">

        </ul>
    `,
    "new-chat": `
        <h1>Start chat</h1>
        <form class="form">
            <div>
                <label for="email" class="form-label">Email:</label>
                <input autofocus autocomplete="off" class="form-control" type="email" name="email" id="email" placeholder="name@domain.com">
            </div>
            <input type="submit" value="Start chat" class="btn btn-primary form__submit">
        </form>
    `
};