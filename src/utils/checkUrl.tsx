export const isValidURL = (string: string): boolean => {
    try{
        Boolean(new URL(string)); 
        return true
    }catch(e){
        return false
    }
}