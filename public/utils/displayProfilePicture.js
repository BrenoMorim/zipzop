// If the user has a profile picture, then display it instead of the default one
export default function displayProfilePicture(user, root=document) {
    if (user.profile_picture !== null) {
            root.querySelector(".user__profile-picture")
                .setAttribute("src", `data:image/png;base64, ${user.profile_picture}`);
    } else {
        root.querySelector(".user__profile-picture")
            .setAttribute("src", "../assets/default-profile-picture.svg");
    }
}