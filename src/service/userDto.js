export default function userDto(user) {
    // Guarantee no sensible data is passed to the front-end

    // Encodes the BLOB from the database to base64, which is easier to display in HTML
    let profile_picture = null;
    if (user.profile_picture !== null) {
        const buffer = Buffer.from(user.profile_picture);
        profile_picture = buffer.toString('base64');
    }

    return {
        email: user.email,
        nickname: user.nickname,
        profile_picture: profile_picture
    };
}