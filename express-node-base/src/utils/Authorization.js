// Function to check if the user is a teacher
function isTeacher(user) {
    // Assuming user object has a role field to check if it's 'teacher'
    return user && user.role === 'teacher';
}

module.exports = {
    isTeacher,
};
