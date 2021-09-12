const lastWeekDays = () => {
    const result = '0123456'.split('').map(n => {
        let d = new Date()
        d.setDate(d.getDate() - n)

        return ((day, month, year) => {
            return [month, day, year].join('/');
        })(d.getDate(), d.getMonth()+1, d.getFullYear());
    });
    return result
}

export default lastWeekDays