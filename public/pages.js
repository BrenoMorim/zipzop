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
        <div class="texts">
            <h3>You can <span class="link" id="register">create an account</span> if you're new here</h3>
            <h3 class="mt-3">or <span class="link" id="login">log in</span> if you own an account</h3>
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
    `,
    "chat": `
        <h1 class="chat-title"></h1>
        <ul class="chat-messages"></ul>
        <form id="send-message">
            <input class="form-control" name="content" id="message-input" placeholder="Message:"/>
            <button class="btn btn-primary" type="submit" id="button-send-message">Send message</button>
        </form>
    `
};