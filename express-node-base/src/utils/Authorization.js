// Function to check if the user is an admin
function isAdmin(user) {
    return user && user.role === 'admin';
}

// Function to check if the user is a teacher or admin
function isTeacherOrAdmin(user) {
    return user && (user.role === 'teacher' || user.role === 'admin');
}

module.exports = { isAdmin, isTeacherOrAdmin };
