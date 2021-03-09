import "./news.css"



function News(props){
    return(
        <div className="news_main_paper">
            <div className="news_main_paper_title">
                <p>경상남도 창원시 의창구 뉴스</p>
            </div>
            <div className="news_main_paper_body">
                <ul>
                    <li>
                        <div className="first_news">
                            <div className="news_title">
                                <a>국도 5호선 창원시 구산면 심리~현동 4차로 신설<span className="news_title_where">-뉴스1</span></a>
                            </div>
                            <div className="first_news_body">
                            이번 개통구간은 선형이 불량하고 취락지구를 통과하는 기존 2차로 도로를 대신해 폭 20m의 4차로 도로를 신설하는 '거제-마산 3구간' 사업(6.4km, 구산면 내포리 현동)이다. 정부는 이번 도로 개통으로 지역 주민의 생활·정주여건의 향상과 인근의 '마산 로봇랜드' 및 해안경관 명소 등으로의 관광 수요 증가를 기대했다.
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="nomal_news">
                        <div className="news_title">
                                <a>박완수 의원 "창원 북면·동읍 투기과열지구 해제해야" 탄원<span className="news_title_where">-연합뉴스</span></a>
                                
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="nomal_news">
                        <div className="news_title">
                                <a>"스페인·싱가포르처럼" 지역 곳곳에서 '섬' 개발 투자<span className="news_title_where">-조선비즈</span></a>
                                
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="nomal_news">
                        <div className="news_title">
                                <a>2·4대책 신규택지, 변수는 '주민 반발'과 '교통망 구축'[부동산360]<span className="news_title_where">-헤럴드경제</span></a>
                                
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="nomal_news">
                        <div className="news_title">
                                <a>서울시, GTX-B '동역사역' 신설 요청 낮은 사업성 '걸림돌'<span className="news_title_where">-서울뉴스</span></a>
                                
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default News