import React, { useEffect } from 'react'
import {
    Fade,
    Loader,
    Placeholder,
    PlaceholderLine,
    PlaceholderMedia,
    Progressive,
    Shine,
    ShineOverlay,
} from "rn-placeholder";
import { View, ScrollView } from 'react-native'
import * as THEME from '../configs/mainTheme'

const PlaceholderLoading = ({
  paddingMain,
  isMediaLeft,
  isMediaRight,
  sizeLeft,
  sizeRight,
  marginTop,
  numberLine,
  numberItem,
  marginBottomItem,
  isContentRow,
  isContentBlockRow,
  paddingRight,
  isContentProduct,
  isContentBanner,
}) => {
    let arr = 
    numberItem == 2 ? 
    [1, 2] :
    numberItem == 3 ?  
    [1, 2, 3] :
    numberItem == 4 ?  
    [1, 2, 3, 4] :
    numberItem == 5 ?  
    [1, 2, 3, 4, 5] :
    numberItem == 6 ?  
    [1, 2, 3, 4 ,5 ,6] :
    numberItem == 7 ?  
    [1, 2, 3, 4 ,5 ,6, 7] : [1]

    return (
        <View style={{padding: paddingMain ? paddingMain : 0, marginTop: marginTop ? marginTop : 0, paddingRight: paddingRight ? paddingRight : 0}}>
        {
            isContentRow && arr.map((i, index) => {
                return (
                    <Placeholder
                        key={index}
                        style={{marginBottom: marginBottomItem ? marginBottomItem : 15}}
                        Animation={Fade}
                        Left={ isMediaLeft ? props => (
                            <PlaceholderMedia
                                size={sizeLeft ? sizeLeft : 50}
                                color={THEME.GRAY3_COLOR}
                            />
                        ) : null}
                        Right={ isMediaRight ? props => (
                            <PlaceholderMedia
                                size={sizeRight ? sizeRight : 50}
                            />
                        ) : null}
                    >
                        <View style={{paddingLeft: isMediaLeft ? 10 : 0, paddingRight: isMediaRight ? 10 : 0}}>
                            {
                                numberLine == 2 ? (
                                    <View>
                                        <PlaceholderLine color={THEME.GRAY3_COLOR} width={60} />
                                        <PlaceholderLine color={THEME.GRAY3_COLOR} width={20} />
                                    </View>
                                ) :
                                numberLine == 3 ? (
                                    <View>
                                        <PlaceholderLine color={THEME.GRAY3_COLOR} width={60} />
                                        <PlaceholderLine color={THEME.GRAY3_COLOR} />
                                        <PlaceholderLine color={THEME.GRAY3_COLOR} width={30} />
                                    </View>
                                ) :
                                numberLine == 4 ? (
                                    <View>
                                        <PlaceholderLine color={THEME.GRAY3_COLOR} width={60} />
                                        <PlaceholderLine color={THEME.GRAY3_COLOR} />
                                        <PlaceholderLine color={THEME.GRAY3_COLOR} width={30} />
                                        <PlaceholderLine color={THEME.GRAY3_COLOR} width={60} />
                                    </View>
                                ) :
                                (
                                    <View>
                                        <PlaceholderLine color={THEME.GRAY3_COLOR} width={60} />
                                        <PlaceholderLine color={THEME.GRAY3_COLOR} />
                                    </View>
                                )
                            }
                        </View>
                    </Placeholder>
                )
            })
        }

        {
            isContentBlockRow && arr.map((i, index) => {
                return (
                    <Placeholder
                        key={index}
                        style={{marginBottom: marginBottomItem ? marginBottomItem : 15}}
                        Animation={Fade}
                        Left={ isMediaLeft ? props => (
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                                <PlaceholderMedia
                                    size={sizeLeft ? sizeLeft : 50}
                                    color={THEME.GRAY3_COLOR}
                                    style={{marginRight: 15}}
                                />
                                <PlaceholderMedia
                                    size={sizeLeft ? sizeLeft : 50}
                                    color={THEME.GRAY3_COLOR}
                                    style={{marginRight: 15}}
                                />
                                <PlaceholderMedia
                                    size={sizeLeft ? sizeLeft : 50}
                                    color={THEME.GRAY3_COLOR}
                                    style={{marginRight: 15}}
                                />
                                <PlaceholderMedia
                                    size={sizeLeft ? sizeLeft : 50}
                                    color={THEME.GRAY3_COLOR}
                                    style={{marginRight: 15}}
                                />
                                <PlaceholderMedia
                                    size={sizeLeft ? sizeLeft : 50}
                                    color={THEME.GRAY3_COLOR}
                                    style={{marginRight: 15}}
                                />
                            </ScrollView>
                        ) : null}
                    >
             
                    </Placeholder>
                )
            })
        }

        {
            isContentProduct &&  (
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                    <View style={{width: '47%',}}>
                        <Placeholder
                            style={{marginBottom: marginBottomItem ? marginBottomItem : 15}}
                            Animation={Fade}
                            Left={ isMediaLeft ? props => (
                                <View style={{width: '100%',}}>
                                    <PlaceholderMedia
                                        size={sizeLeft ? sizeLeft : 50}
                                        color={THEME.GRAY3_COLOR}
                                        style={{ width: '100%', height: 150, marginBottom: 20}}
                                    />
                                     <View>
                                        <PlaceholderLine color={THEME.GRAY3_COLOR} width={80} />
                                        <PlaceholderLine color={THEME.GRAY3_COLOR} />
                                        <PlaceholderLine color={THEME.GRAY3_COLOR} width={50} />
                                    </View>
                                </View>
                            ) : null}
                        />
                    </View>

                    <View style={{width: '47%',}}>
                        <Placeholder
                            style={{marginBottom: marginBottomItem ? marginBottomItem : 15}}
                            Animation={Fade}
                            Left={ isMediaLeft ? props => (
                                <View style={{width: '100%',}}>
                                    <PlaceholderMedia
                                        size={sizeLeft ? sizeLeft : 50}
                                        color={THEME.GRAY3_COLOR}
                                        style={{ width: '100%', height: 150, marginBottom: 20}}
                                    />
                                     <View>
                                        <PlaceholderLine color={THEME.GRAY3_COLOR} width={80} />
                                        <PlaceholderLine color={THEME.GRAY3_COLOR} />
                                        <PlaceholderLine color={THEME.GRAY3_COLOR} width={50} />
                                    </View>
                                </View>
                            ) : null}
                        />
                    </View>

                </View>
            )
        }

        {
            isContentBanner &&  (
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                    <View style={{width: '90%', marginRight: 20}}>
                        <Placeholder
                            Animation={Fade}
                            Left={ isMediaLeft ? props => (
                                <View style={{width: '100%',}}>
                                    <PlaceholderMedia
                                        size={sizeLeft ? sizeLeft : 50}
                                        color={THEME.GRAY3_COLOR}
                                        style={{ width: '100%', height: 150}}
                                    />
                                </View>
                            ) : null}
                        />
                    </View>

                    <View style={{width: '90%',}}>
                        <Placeholder
                            Animation={Fade}
                            Left={ isMediaLeft ? props => (
                                <View style={{width: '100%',}}>
                                    <PlaceholderMedia
                                        size={sizeLeft ? sizeLeft : 50}
                                        color={THEME.GRAY3_COLOR}
                                        style={{ width: '100%', height: 150}}
                                    />
                                </View>
                            ) : null}
                        />
                    </View>

                </View>
            )
        }
        </View>
    )
}

export default PlaceholderLoading