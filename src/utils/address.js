export const getAddressVietNam = (datas, city, district, ward) => {
    if (datas) {
        const cities = datas.filter((data) => data.codename == city)[0]
        let districts = null
        if(cities){
            districts = cities.districts.filter((dt) => dt.codename == district)[0]
        }
        let wards = null
        if(districts){
            wards = districts.wards.filter((w) => w.codename == ward)[0]
        }
        if(cities && districts && wards){
            return wards.name + ", " + districts.name + ", " + cities.name
        }
        return ""
    }
}