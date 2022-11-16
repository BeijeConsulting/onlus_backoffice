const checkRole = (params: any): string => {
    if (params.includes('SUPERADMIN')) {
        return '3'
    } else if (params.includes('ADMIN')) {
        return '2'
    } else {
        return '4'
    }
}

export default checkRole;