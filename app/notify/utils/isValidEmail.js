export default function isValidEmail(email){
    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regex.test(email.trim())) return false
    else return true
}