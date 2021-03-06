import React, {useState} from 'react';
import Modal from "../Modal";
import {useDispatch, useSelector} from "react-redux";
import {dataSearch, getDataCurrentWeather} from "../../../actions/actions";
import ButtonCustom from "../../ButtonCustom";
import CustomSearch from "../../CustomSearch";
import styles from './ModalSelectPositions.module.scss'

function ModalSelectPositions({ onClose,locateCity,showCity,currentCity }) {
    const dispatch = useDispatch();
    const dataResult = useSelector(state => state?.data?.resultSearch);
    const [searchCity, setSearchCity] = useState('');
    const [openDropDownSearch, setOpenDropDownSearch] = useState(false);

    const saveCity = (currenCity) => {
        localStorage.setItem('GEOLOCATIONS', JSON.stringify(currenCity));
        dispatch(getDataCurrentWeather(currenCity.lat, currenCity.lon));
        onClose();
    }

    const getSearchCity = async (e) => {
        if(e.key === 'Enter'){
            await dispatch(dataSearch(searchCity))
            setOpenDropDownSearch(true)
        }
    }

    return (
        <Modal title={'Выберите регион вручную или определите свое расположение'}>
            <div>
                <div className={styles.searchContainer}>
                    <CustomSearch
                        height='40px'
                        onChange={(e)=>setSearchCity(e.target.value)}
                        onKeyDown={(e)=> getSearchCity(e)}
                        deleteValue={()=>setSearchCity('')}
                        onClose={()=>setOpenDropDownSearch(false)}
                        value={searchCity}
                        openCityList={openDropDownSearch}
                        dataResult={dataResult}
                        onCloseDropdown={()=>setOpenDropDownSearch(false)}
                    />
                </div>
                <div className={styles.btn}>
                    <ButtonCustom
                        onClick={locateCity}
                        title='Определить местоположение'
                    />
                </div>
                {showCity &&
                    <>
                        <div>Ваш город: {currentCity[0].name}?</div>
                        <div>
                            <ButtonCustom
                                onClick={() => saveCity(currentCity[0])}
                                title='Да'
                            />
                        </div>
                    </>
                }
            </div>
        </Modal>
    );
}

export default ModalSelectPositions;