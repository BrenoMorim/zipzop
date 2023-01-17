export default function userDto(user) {
    // Guarantee no sensible data is passed to the front-end
    return {
        email: user.email,
        nickname: user.nickname,
        profile_picture: user.profile_picture
    };
}