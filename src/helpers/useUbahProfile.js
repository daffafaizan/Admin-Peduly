import { useEffect, useState } from 'react'
import { API_URL } from 'config/api'
import http from 'helpers/http'

export const useOptionPekerjaan = (ubahData) => {
    const [optionPekerjaan, setOptionPekerjaan] = useState([])

    const getListPekejaan = () => {
        http.get(`${API_URL}/api/pekerjaan`)
            .then((res) => {
                setOptionPekerjaan(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        if (ubahData) getListPekejaan()
    }, [ubahData])

    return optionPekerjaan.map((c) => ({
        value: c.id,
        label: c.pekerjaan,
    }))
}

export const useOptionJenisOrganisasi = (ubahData) => {
    const [optionJenisOrganisasi, setOptionJenisOrganisasi] = useState([])

    const getListJenisOrganisasi = () => {
        http.get(`${API_URL}/api/organisasi`)
            .then((res) => {
                setOptionJenisOrganisasi(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        if (ubahData) getListJenisOrganisasi()
    }, [ubahData])

    return optionJenisOrganisasi.map((c) => ({
        value: c.id,
        label: c.jenis_lembaga,
    }))
}

export const useOptionProvinsi = (ubahData) => {
    const [optionProvinsi, setOptionProvinsi] = useState([])

    const getListProvinsi = () => {
        http.get(`${API_URL}/api/prov`)
            .then((res) => {
                setOptionProvinsi(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        if (ubahData) getListProvinsi()
    }, [ubahData])

    return optionProvinsi.map((c) => ({
        value: c.id,
        label: c.name,
    }))
}

export const useOptionKabupaten = (idProvinsi) => {
    const [optionKabupaten, setOptionKabupaten] = useState([])

    const getListKabupaten = () => {
        http.get(`${API_URL}/api/kab?provinceId=${idProvinsi}`)
            .then((res) => {
                setOptionKabupaten(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        if (idProvinsi) getListKabupaten()
    }, [idProvinsi]) // eslint-disable-line react-hooks/exhaustive-deps

    return optionKabupaten?.map((c) => ({
        value: c.id,
        label: c.name,
    }))
}

export const useOptionKecamatan = (idKabupaten) => {
    const [optionKecamatan, setOptionKecamatan] = useState([])

    const getListKecamatan = () => {
        http.get(`${API_URL}/api/kec?regencyId=${idKabupaten}`)
            .then((res) => {
                setOptionKecamatan(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        if (idKabupaten) getListKecamatan()
    }, [idKabupaten]) // eslint-disable-line react-hooks/exhaustive-deps

    return optionKecamatan.map((c) => ({
        value: c.id,
        label: c.name,
    }))
}