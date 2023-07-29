import { View, Text } from 'react-native'
import React from 'react'
import { categoryBG, colors } from '../theme'

const ExpenseCard = ({item}) => {
  return (
    <View className='flex-row justify-between items-center p-3 px-5 rounded-2xl mb-3'
      style={{backgroundColor: categoryBG[item.category]}}
    >
      <View>
        <Text className={`${colors.heading} font-bold`}>{item.title}</Text>
        <Text className={`${colors.heading} font-semibold`}>{item.category}</Text>
      </View>
      <View>
        <Text>$ {item.amount}</Text>
      </View>
    </View>
  )
}

export default ExpenseCard