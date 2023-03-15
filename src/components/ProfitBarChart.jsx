import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react'; 
import { useNavigate } from 'react-router-dom';
import Fetch from '../services/Fetch';
import { Skeleton } from '@mui/material';
import useLocalStorage from '../hooks/LocalStorage';

export default function ProfitBarChart() {
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Апр 2022', 'Май 2022', 'Июн 2022', 'Июл 2022', 'Авг 2022', 'Сен 2022', 'Окт 2022', 'Ноя 2022', 'Дек 2022', 'Янв 2023', 'Фев 2023', 'Мар 2023']
        },
        yAxis: {
            name: 'Доход',
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'bar'
            }
        ]
    }; 

    const [user, setUser] = useLocalStorage('user', null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getProfitArray = data => {
        return data.map(period => period.profit).reverse();
    }

    const getOptions = data => {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['Апр 2022', 'Май 2022', 'Июн 2022', 'Июл 2022', 'Авг 2022', 'Сен 2022', 'Окт 2022', 'Ноя 2022', 'Дек 2022', 'Янв 2023', 'Фев 2023', 'Мар 2023']
            },
            yAxis: {
                name: 'Доход',
                type: 'value'
            },
            series: [
                {
                    data: getProfitArray(data),
                    type: 'bar'
                }
            ]
        }
    }

    useEffect(() => {
        const getData = async () => {
            const fetchProfits = new Fetch('/api/profit/').auth(user.token);
            const response = await fetchProfits.get();
            if (response && response.successful) {
                setData(response.data);
                setError(null);
            } else {
                setError(response.error.message);
                setData(null);
                if (response.error.name === 'AuthException') {
                    navigate('/login');
                }
            }
            setIsLoading(false);
        };
        getData();
    }, []);

    return (
        isLoading || error || (!data)
        ? (
            <Skeleton />
        )
        : (
            <ReactEcharts option={getOptions(data)} />
        )
    );
}