"use client"
import { Heading, Box, Text, Spinner, Button, Select, Stack, Flex } from "@chakra-ui/react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Rectangle } from 'recharts';
import { salesAnnualData, salesMonthlyData, salesNoData } from "../../../../test/dummyChartData";
import { annualSexDemography, monthlySexDemography, dailySexDemography, noSexDemography } from "../../../../test/dummyChartData";
import { annualOriginDemography, monthlyOriginDemography, dailyOriginDemography, NoOriginDemography } from "../../../../test/dummyChartData";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { LuCalendarDays } from "react-icons/lu";

export default function page() {

    const [salesIsLoading, setSalesLoading] = useState(false)
    const [sales, setSales] = useState<any[]>([])
    const [groupBy, setGroupBy] = useState('')
    const [startDate, setStartDate] = useState<null | Date>()
    const [endDate, setEndDate] = useState<null | Date>()
    const [filter, setFilter] = useState('')

    useEffect(() => {
        if (!groupBy) {
            setSalesLoading(false)
            return
        }
        getSales()
    }, [filter])

    // const sales = salesAnnualData
    const sexDemography = annualSexDemography
    const originDemography = monthlyOriginDemography

    async function getSales() {
        setSalesLoading(true)
        await axios.get(`http://localhost:1010/data/sales?groupBy=${groupBy}&startDate=${startDate}&endDate=${endDate}`)
            .then((res: AxiosResponse) => {
                setSales(res.data.data)
                setSalesLoading(false)
            })
            .catch((err: AxiosError) => {
                setSales((err.response?.data) as [])
                setSalesLoading(false)
            })
    }

    function submit() {
        setFilter(`groupBy: ${groupBy}, startDate: ${startDate}, endDate: ${endDate}`)
    }

    return (
        <>
            <Heading>Reports</Heading>
            <Stack gap={4}>
                <Heading size={'md'} mt={'2rem'}>Filter</Heading>
                <Flex gap={3} justify={{ base: 'space-between', md: 'flex-start' }} direction={{ base: 'column', md: 'row' }}>
                    <Box w={{ md: '230px' }}>
                        <Text>Group range by: </Text>
                        <Select placeholder="Group by" onChange={(ev) => setGroupBy(ev.target.value)} bg={'white'}>
                            <option value={'year'}>Year</option>
                            <option value={'month'}>Month</option>
                            <option value={'day'}>Day</option>
                        </Select>
                    </Box>
                    <Box>
                        <Text>Start Date: </Text>
                        <DatePicker
                            showIcon
                            icon={<LuCalendarDays />}
                            selected={startDate}
                            onChange={(e) => setStartDate(e)}
                        />
                    </Box>
                    <Box>
                        <Text>End Date: </Text>
                        <DatePicker
                            showIcon
                            icon={<LuCalendarDays />}
                            selected={endDate}
                            onChange={(e) => setEndDate(e)}
                        />
                    </Box>
                </Flex>
                <Button colorScheme="blue" onClick={submit} width={'fit-content'} px={10}>Generate Report</Button>
            </Stack >
            {/* SALES */}
            {
                salesIsLoading
                    ? <>
                        <Box h={'300px'} w={'full'} mt={5} >
                            <Heading size={'md'} mb={'1rem'} >Ticket Sales</Heading>
                            <Spinner />
                        </Box>
                    </>
                    : sales.length
                        ?
                        <Box h={'300px'} w={'full'} mt={5} >
                            <Heading size={'md'} mb={'1rem'} >Ticket Sales</Heading>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    width={250}
                                    height={300}
                                    data={sales}
                                    margin={{
                                        top: 15,
                                        right: 30,
                                        left: 0,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="sale" stroke="#8884d8" activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                        : <>
                            <Heading mt={5} size={'md'} mb={'1rem'}>Ticket Sales</Heading>
                            <Text>No data available. Try changing the filter.</Text>
                        </>
            }
        </>
    )
}
