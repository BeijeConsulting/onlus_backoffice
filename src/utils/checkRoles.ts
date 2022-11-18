const checkRole = (params: any): string => {
    if (params.includes('SUPERADMIN')) {
        return '3'
    } else if (params.includes('ADMIN')) {
        return '2'
    } else if (params.includes('BLOGGER')){
        return '4'
    } else {
        return '1'
    }
}

export default checkRole;