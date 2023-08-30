import *as React from "react";
import { Text, View, AsyncStorage, TouchableOpacity, Dimensions, TextInput, ScrollView, Image, ImageBackground } from 'react-native'
import { FAB, Provider, Portal, Snackbar } from "react-native-paper";
import Icons from 'react-native-vector-icons/FontAwesome5'
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
const { width, height } = Dimensions.get('window')
export default class Page6 extends React.Component {

    componentWillMount() {
        Dimensions.addEventListener('change', ({ window }) => {
            const n_width = window.width
            const n_height = window.height
            this.setState({
                Width: n_width,
                Height: n_height,
            })



        })

        this.build()
        //this.Read()

    }

    componentDidMount() {

    }


    constructor(props) {
        super(props)
        {
            this.state = {
                Width: width,
                Height: height,
                arr: [],
                answer: null,
                score: 0,

            }
        }
    }

    /* async Read() {
         let data = await AsyncStorage.getItem(('degree'))
         //data=await AsyncStorage.removeItem('degree')
         if (data)
         
         {
         data = JSON.parse(data)
         this.setState({ arr: data })}
     }
 */
    async store(value) {
        await AsyncStorage.setItem('degree', JSON.stringify(value))
    }

    build() {

        let num_length = Math.floor(Math.random() * 10) + 10
        let arr = [];
        let num1 = Math.floor(Math.random() * 11) + 10
        let num2 = Math.floor(Math.random() * 11) + 10
        let obj = {
            que: '',
            ans: 0,
            user_ans: null
        }
        for (let i = 0; i < num_length; i++) {
            if (i % 4 == 0) {
                obj = {
                    que: (num1 + '+' + num2),
                    ans: num1 + num2,
                    user_ans: null
                }
                arr.push(obj)
                num1 = Math.floor(Math.random() * 11) + 10
                num2 = Math.floor(Math.random() * 11) + 10
                obj = {
                    que: '',
                    ans: 0,
                    user_ans: null
                }
            }

            else if (i % 2 == 0) {
                obj = {
                    que: (num1 + '*' + num2),
                    ans: num1 * num2,
                    user_ans: null
                }
                arr.push(obj)
                num1 = Math.floor(Math.random() * 11) + 10
                num2 = Math.floor(Math.random() * 11) + 10
                obj = {
                    que: '',
                    ans: 0,
                    user_ans: null
                }
            }

            else if (i % 3 == 0) {
                obj = {
                    que: (num1 + '-' + num2),
                    ans: num1 - num2,
                    user_ans: null
                }
                arr.push(obj)
                num1 = Math.floor(Math.random() * 11) + 10
                num2 = Math.floor(Math.random() * 11) + 10
                obj = {
                    que: '',
                    ans: 0,
                    user_ans: null
                }
            }
            else {
                obj = {
                    que: (num1 + '/' + num2),
                    ans: parseInt(num1 / num2),
                    user_ans: null
                }
                arr.push(obj)
                num1 = Math.floor(Math.random() * 11) + 10
                num2 = Math.floor(Math.random() * 11) + 10
                obj = {
                    que: '',
                    ans: 0,
                    user_ans: null
                }
            }


        }

        this.setState({ arr })


    }

    Check_result() {

        let arr = this.state.arr
        let score = this.state.score
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].ans == arr[i].user_ans)
                score++
        }
        this.setState({ score })
        //this.state(arr)
    }

    ShowResult_page() {
        return (
            <>
                {
                    this.state.score == 0 ?
                        <View style={{
                            backgroundColor: '#c2d3e1',
                            width: '100%',
                            height: scale(50),
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottomWidth: 5,

                            borderColor: '#1370bb',
                        }}>
                            <Text style={{ color: '#1370bb', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>
                                Math Exam
                            </Text>
                        </View>
                        :
                        null
                }


                <View>
                    {
                        this.state.arr.map((item, index) =>

                            <View>

                                <View style={{
                                    width: '90%',
                                    height: scale(60),
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 30,
                                    padding: 10,
                                    marginTop: 10,
                                    backgroundColor: '#1370bb'
                                }}>
                                    <View style={{
                                        width: verticalScale(55),
                                        height: scale(55),
                                        backgroundColor: '#c2d3e1',
                                        borderRadius: 28,
                                        marginLeft: -5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={{ fontSize: 22, fontWeight: '400' }}>{index + 1}</Text>
                                    </View>
                                    <Text style={{ fontSize: 18, marginLeft: 5, color: '#ebeced', fontWeight: '400' }}>{item.que + ' ='}</Text>
                                    <TextInput placeholder='.....'
                                        placeholderTextColor='#ebeced'
                                        style={{ color: '#c2d3e1', fontSize: 18, height: '100%', marginTop: 5 }}
                                        value={item.ans}
                                        onChangeText={(newVal) => {

                                            newVal = parseInt(newVal)
                                            let arr = this.state.arr
                                            let obj = {
                                                que: item.que,
                                                ans: item.ans,
                                                user_ans: newVal
                                            }
                                            arr.splice(index, 1, obj)
                                            this.setState({ arr })
                                            this.store(arr)
                                        }}

                                    />
                                </View>

                            </View>
                        )
                    }

                    <TouchableOpacity
                        style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: verticalScale(80),
                            height: scale(50),
                            marginTop: 15
                        }}
                        onPress={() => {
                            this.Check_result()
                            this.store(this.state.arr)
                        }}
                    >
                        <Image source={require('../Assets/Icon/icons8-submit-64.png')} style={{ width: 70, height: 70, marginTop: 5 }} />
                    </TouchableOpacity>
                </View>
            </>
        )
    }


    render() {
        return (
            <>

                <ScrollView style={{ backgroundColor: '#b5d3eb5c' }}>

                    {
                        this.state.score == 0 ?
                            <View style={{
                                backgroundColor: '#c2d3e1',
                                width: '100%',
                                height: scale(50),
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderBottomWidth: 5,

                                borderColor: '#1370bb',
                            }}>
                                <Text style={{ color: '#1370bb', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>
                                    Math Exam
                                </Text>
                            </View>
                            :
                            null
                    }

                    {
                        this.state.score == 0 ?
                            <View>
                                {
                                    this.state.arr.map((item, index) =>

                                        <View style={{
                                            width: '90%',
                                            height: scale(60),
                                            alignSelf: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            borderRadius: 30,
                                            padding: 10,
                                            marginTop: 10,
                                            backgroundColor: '#1370bb',
                                            justifyContent: 'space-between'
                                        }}
                                        >

                                            <View style={{

                                                height: scale(60),
                                                alignSelf: 'center',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                borderRadius: 30,
                                            }}>
                                                <View style={{
                                                    width: verticalScale(55),
                                                    height: scale(55),
                                                    backgroundColor: '#c2d3e1',
                                                    borderRadius: 28,
                                                    marginLeft: -5,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    <Text style={{ fontSize: 22, fontWeight: '400' }}>{index + 1}</Text>
                                                </View>
                                                <Text style={{ fontSize: 18, marginLeft: 5, color: '#ebeced', fontWeight: '400' }}>{item.que + ' ='}</Text>
                                                {<TextInput placeholder='.....'
                                                    placeholderTextColor='#ebeced'
                                                    keyboardType='numeric'
                                                    style={{ color: '#c2d3e1', fontSize: 18, height: '100%', marginTop: 5 }}
                                                    value={item.ans}
                                                    onChangeText={(newVal) => {

                                                        newVal = parseInt(newVal)
                                                        let arr = this.state.arr
                                                        let obj = {
                                                            que: item.que,
                                                            ans: item.ans,
                                                            user_ans: newVal
                                                        }
                                                        arr.splice(index, 1, obj)
                                                        this.setState({ arr })
                                                        this.store(arr)
                                                    }}

                                                />}
                                            </View>

                                            {/*<Text>{item.user_ans==''?'Done':'Not start'}</Text>*/}

                                        </View>
                                    )
                                }

                                <TouchableOpacity
                                    style={{
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: verticalScale(80),
                                        height: scale(50),
                                        marginTop: 15
                                    }}
                                    onPress={() => {
                                        this.Check_result()
                                        //this.store(this.state.arr)
                                    }}
                                >
                                    <Image source={require('../Assets/Icon/icons8-submit-64.png')} style={{ width: 70, height: 70, marginTop: 5 }} />
                                </TouchableOpacity>
                            </View>
                            :
                            (
                                <View>
                                    <View style={{
                                        backgroundColor: '#c2d3e1',
                                        width: '100%',
                                        height: scale(50),
                                        alignItems: 'center',
                                        justifyContent: 'center',

                                    }}>
                                        <Text style={{ color: '#1370bb', fontSize: 20, fontWeight: 'bold' }}>Keep good progress in Math</Text>

                                    </View>
                                    {
                                    this.state.score / this.state.arr.length * 100 >= 50 ?
                                        <Text style={{ color: '#1370bb', fontSize: 20, fontWeight: '400', marginLeft: 20, marginTop: 30 }}>Good Luck In Your Exam</Text>
                                        :
                                        <Text style={{ color: '#780c04', fontSize: 20, fontWeight: '400', marginLeft: 20, marginTop: 30 }}>Sorry,You can try again</Text>

                                    }
                                    {this.state.score / this.state.arr.length * 100 >= 50 ?
                                    <Image source={require('../Assets/Icon/icons8-successful-64.png')}
                                        resizeMode='contain'
                                        style={{ width: '70%', height: scale(200), marginTop: 5, alignSelf: 'center', marginTop: 30 }} />
                                  :
                                  <Image source={require('../Assets/Icon/physical-abuse.png')}
                                        resizeMode='contain'
                                        style={{ width: '70%', height: scale(200), marginTop: 5, alignSelf: 'center', marginTop: 30 }} />
                                   
                                  }
                                    <Text style={{ color:this.state.score / this.state.arr.length * 100 >= 50 ? '#1a5c91':'#780c04',
                                     fontSize: 20, fontWeight: '400', marginLeft: 20, marginTop: 15, textAlign: 'center' }}>
                                        You have successfully answer on {this.state.score} questions
                                    </Text>

                                    <View style={{ width: '90%', height: scale(130), backgroundColor: '#1370bb', borderRadius: 20, marginTop: 40, alignSelf: 'center', alignItems: 'center' }}>
                                        <View style={{
                                            width: '100%',
                                            height: scale(120),
                                            backgroundColor: '#fff',
                                            borderRadius: 20,
                                            marginTop: 10,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-around'
                                        }}>
                                            <ImageBackground
                                                source={require('../Assets/Icon/icons8-loading-sign-64.png')}
                                                resizeMode='contain'
                                                style={{ width: 120, height: 120, alignItems: 'center', justifyContent: 'center' }}
                                            >

                                                <Text style={{ color: '#1a5c91', fontSize: 20, fontWeight: 'bold', }}>{this.state.arr.length}</Text>
                                                <Text style={{ color: '#1a5c91', fontWeight: '400', marginTop: -6 }}>questions</Text>

                                            </ImageBackground>

                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ color: '#1a5c91', fontWeight: '400' }}>{parseInt(this.state.score / this.state.arr.length * 100) + '%'}</Text>
                                                <Text style={{ color: '#1a5c91', fontWeight: '400' }}>Accurate</Text>
                                            </View>

                                            <View style={{ alignItems: 'center' }}>
                                                <Text style={{ color: '#f00', fontWeight: '400' }}>{(100 - parseInt(this.state.score / this.state.arr.length * 100)) + '%'}</Text>
                                                <Text style={{ color: '#f00', fontWeight: '400' }}>Incorrect</Text>
                                            </View>

                                        </View>
                                       
                                    </View>

                                    <TouchableOpacity style={{width:'50%',height:scale(80),flexDirection:'row',marginLeft:30,marginTop:25}}
                                    onPress={() =>{
                                        this.setState({score:0})
                                        this.build()
                                    }}
                                    >
                                    <Text style={{ color: '#1370bb', fontSize: 20, fontWeight: '500', marginLeft: 20, marginTop: 30,marginRight:20 }}>Try again</Text>
                                    <Image source={require('../Assets/Icon/pngwing.com.png')}
                                        resizeMode='contain'
                                        style={{ width: '60%', height:'50%',marginLeft:-50,marginTop:12}} />
                                  
                                    </TouchableOpacity>

                                </View>
                            )
                    }

                </ScrollView>

            </>
        )
    }
}