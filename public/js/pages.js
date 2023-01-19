export const pages = {
    "register": `
        <h1>Register</h1>
        <form class="form">
            <div>
                <label for="nickname" class="form-label">Nickname:</label>
                <input autofocus autocomplete="off" class="form-control" type="nickname" name="nickname" id="nickname" placeholder="Your nickname">
            </div>
            <div>
                <label for="email" class="form-label">Email:</label>
                <input autocomplete="off" required class="form-control" type="email" name="email" id="email" placeholder="name@domain.com">
            </div>
            <div>
                <label for="password" class="form-label">Password:</label>
                <input type="password" name="password" id="password" class="form-control" placeholder="Your password">
                <input type="password" name="passwordConfirmation" class="form-control mt-3" placeholder="Confirm your password">
            </div>
            <input type="submit" value="Register" class="button button--alternative form__submit">
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
            <input type="submit" value="Sign in" class="button button--alternative form__submit">
        </form>
    `,
    "index": `
        <h1>Welcome to ZipZop!</h1>
        <h2 class="center">Speak privately with anyone, anytime and anywhere!</h2>
        <div class="texts">
            <h3>You can <span class="link" id="register">create an account</span> if you're new here</h3>
            <h3 class="mt-3">or <span class="link" id="login">log in</span> if you own an account</h3>
        </div>
    `,
    "homepage": `
        <img src="/assets/default-profile-picture.svg" class="user__profile-picture" height="128" width="128"/>
        <h1 id="greet-user"></h1>
        <h2>Your chats</h2>
        <input id="query-chat" class="form-control" placeholder="Search in chats" />
        <button id="start-chat" class="button button--alternative">Start new chat</button>
        <ul class="chats">
            <li class="chats--empty" id="no-chats-yet">No chats yet</li>
            <li class="chats--empty" id="no-chats-found">No chats found</li>
        </ul>
    `,
    "new-chat": `
        <h1>Start chat</h1>
        <form class="form">
            <div>
                <label for="email" class="form-label">Email:</label>
                <input autofocus autocomplete="off" class="form-control" type="email" name="email" id="email" placeholder="name@domain.com">
            </div>
            <input type="submit" value="Start chat" class="button button--alternative form__submit">
        </form>
    `,
    "chat": `
        <img src="/assets/default-profile-picture.svg" class="user__profile-picture" height="128" width="128"/>
        <h1 class="chat__title"></h1>
        <div class="chat__load-more"><button class="button" id="load-more">Load more</button></div>
        <ul class="chat">
            <li class="chat__message--empty">No messages yet</li>
        </ul>
        <form id="send-message">
            <input class="form-control" name="content" required autocomplete="off" autofocus id="message-input" placeholder="Message:"/>
            <button class="button button--alternative" type="submit" id="button-send-message">Send message</button>
        </form>
    `,
    "profile": `
        <img src="/assets/default-profile-picture.svg" class="user__profile-picture" height="128" width="128"/>
        <h1 class="profile__title"></h1>
        <h2 class="profile__email"></h2>
        <form id="add-profile-picture" class="profile__form">
            <h3 class="profile__text">Add new profile picture</h3>
            <input type="file"
                class="button button--alternative"
                name="profilePicture"
                id="profile-picture"
                accept="image/png, image/jpeg">
            <button type="submit" class="button button--alternative">Send picture</button>
            <button class="button" type="button" id="remove-profile-picture">Remove profile picture</button>
        </form>
        <form class="profile__form" id="change-nickname">
            <h3 class="profile__text" id="current-nickname"></h3>
            <div class="profile__input">
                <input class="form-control" name="nickname" type="text" placeholder="New nickname" autocomplete="off" />
            </div>
            <button class="button button--alternative" type="submit">Change Nickname</button>
        </form>
        <form class="profile__form" id="change-password">
            <h3 class="profile__text">Change password</h3>
            <div class="profile__input">
                <input class="form-control" name="newPassword" placeholder="New password" type="password" autocomplete="off" />
                <input class="form-control mt-3" name="confirmNewPassword" placeholder="Confirm new password" type="password" autocomplete="off" />
            </div>
            <button class="button button--alternative" type="submit">Change Password</button>
        </form>
    `
};