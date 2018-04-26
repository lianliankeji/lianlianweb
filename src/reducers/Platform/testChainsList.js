import * as actionsTypes from 'constants/index.js'

const initialState = {
    testChainsList:[],
    contractState: {
        "0": "上传成功",
        "1": "正在安装",
        "2": "安装失败",
        "3": "安装成功",
        "4": "正在部署",
        "5": "部署失败",
        "6": "部署成功",
        "7": "正在升级",
        "8": "升级失败",
        "9": "升级成功",
        "10": "运行",
        "11": "停止",
    }
};
export default function testChainsList(state = initialState, action) {
    switch (action.type) {
        case actionsTypes.GET_TEST_CHAINS_LIST:
            return Object.assign({},state, {testChainsList: [...action.result]});
            break;
        case actionsTypes.TEST_LIST_SHOW_AND_HIDE:
            return Object.assign({},state, {testChainsList: [...action.result]});
            break;
        case actionsTypes.SEARCH_TEST_CHAINS_LIST:
            return Object.assign({},state, {testChainsList: [...action.result]});
            break;
        case actionsTypes.TEST_LIST_SELECT:
            return Object.assign({},state, {testChainsList: [...action.result]});
            break;
        default:
            return state
    }
}