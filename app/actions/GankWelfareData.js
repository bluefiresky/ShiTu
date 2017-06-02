/**
 * Created by Rabbit on 2017/6/2.
 */
import * as types from '../constant/ActionTypes';
import Config from '../common/Config';

import Request from '../common/Request';

export function welfareData(page, type, isLoading, isLoadMore, isRefreshing) {
    return dispatch => {
        type = encodeURIComponent(type);
        let url = `${Config.api.getGankData}?page=${page}&count=${'20'}&type=${type}`;

        // 1.发出拉取数据的信号
        dispatch(loadWelfareContent(isLoading, isLoadMore, isRefreshing));

        return Request.get(url,(data)=>{
            if (data &&data.success) {
                let results = data.data.results;
                results.map((item, i) => {
                    let imageWidth = SCREEN_WIDTH / 2 - 15;
                    let imageHeight = imageWidth * 1.15;
                    imageHeight = parseInt(Math.random() * 100 + imageHeight);
                    item.imageHeight = imageHeight;
                    item.imageWidth = imageWidth;
                    // console.log(item);
                });
                dispatch(getWelfareData(results));
            }
        },(error)=>{
            console.log(error);

        })
    }
};

export function loadWelfareContent(isLoading, isLoadMore, isRefreshing) {
    return {
        type: types.LOAD_WELFARE_LIST,
        isLoading: isLoading,
        isLoadMore: isLoadMore,
        isRefreshing: isRefreshing
    }
}

export function getWelfareData(welfareData) {
    return {
        type: types.GET_WELFARE_LIST,
        welfareData
    }
}