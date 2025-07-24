//====Swiper 슬라이더 초기화 및 설정 시작===========================
/**
 * Swiper 슬라이더 초기화 및 설정
 * 
 * Swiper는 모던한 터치 슬라이더 라이브러리로, 
 * 하드웨어 가속 전환과 다양한 효과를 제공합니다.
 */

// DOM이 완전히 로드된 후 실행되는 이벤트 리스너
// DOMContentLoaded: HTML 문서가 완전히 로드되고 파싱된 후 발생하는 이벤트
document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * 메인 스와이퍼 인스턴스 생성
     * 
     * new Swiper(selector, options): Swiper 객체를 생성하는 생성자 함수
     * - selector: CSS 선택자 문자열 (슬라이더 컨테이너 요소)
     * - options: 설정 옵션 객체
     */
    const mainSwiper = new Swiper('main .container .swiper', {
        
        /**
         * 기본 슬라이드 설정
         */
        slidesPerView: 1,        // 한 번에 보여질 슬라이드 개수 (1개씩)
        spaceBetween: 0,         // 슬라이드 간 간격 (0px)
        loop: true,              // 무한 루프 활성화 (마지막 슬라이드 후 첫 번째로 돌아감)
        
        /**
         * 페이지네이션 설정 객체
         * 페이지네이션: 현재 슬라이드 위치를 표시하는 UI 요소
         */
        pagination: {
            el: 'main .container .swiperControlWrap .swiperControl .swiper-pagination',  // 페이지네이션 요소 선택자
            type: 'fraction',    // 페이지네이션 타입: 'bullets'(점), 'fraction'(1/3), 'progressbar'(진행바)
            clickable: false,    // 페이지네이션 클릭 비활성화 (자동 슬라이드만 사용)
            
            /**
             * 현재 슬라이드 번호 포맷 함수
             * @param {number} number - 현재 슬라이드 번호
             * @returns {string} - 표시될 텍스트
             */
            formatFractionCurrent: function (number) {
                return number;   // 현재 번호를 그대로 반환 (예: 1, 2, 3)
            },
            
            /**
             * 전체 슬라이드 개수 포맷 함수
             * @param {number} number - 전체 슬라이드 개수
             * @returns {string} - 표시될 텍스트
             */
            formatFractionTotal: function (number) {
                return number;   // 전체 개수를 그대로 반환 (예: 3)
            }
        },
        
        /**
         * 네비게이션 버튼 설정 객체
         * 네비게이션: 이전/다음 슬라이드로 이동하는 버튼
         */
        navigation: {
            nextEl: 'main .container .swiperControlWrap .swiperControl .swiper-button-next',  // 다음 버튼 요소 선택자
            prevEl: 'main .container .swiperControlWrap .swiperControl .swiper-button-prev',  // 이전 버튼 요소 선택자
        },
        
        /**
         * 자동 재생 설정 객체
         * autoplay: 일정 시간마다 자동으로 다음 슬라이드로 이동
         */
        autoplay: {
            delay: 5000,         // 슬라이드 간 대기 시간 (밀리초 단위, 5초)
            disableOnInteraction: false,  // 사용자 상호작용 후에도 자동 재생 유지
        },
        
        /**
         * 전환 효과 설정
         */
        effect: 'fade',          // 전환 효과: 'slide'(슬라이드), 'fade'(페이드), 'cube'(큐브) 등
        
        /**
         * 페이드 효과 세부 설정 객체
         * fadeEffect: effect가 'fade'일 때만 적용되는 설정
         */
        fadeEffect: {
            crossFade: true      // 크로스페이드 활성화 (이전 슬라이드가 사라지면서 새 슬라이드가 나타남)
        },
        
        speed: 800,              // 전환 애니메이션 속도 (밀리초 단위, 0.8초)
        
        /**
         * Swiper 이벤트 핸들러
         */
        on: {
            init: function() {
                // Swiper 초기화 완료 시 실행
                setEqualHeight();
            },
            resize: function() {
                // 윈도우 리사이즈 시 실행
                setEqualHeight();
            },
            slideChange: function() {
                // 슬라이드 변경 시에도 높이 재계산 (필요시)
                setTimeout(setEqualHeight, 100);
            }
        }
    });
    
    /**
     * mainSwiper 객체의 주요 메서드들:
     * 
     * - mainSwiper.slideNext(): 다음 슬라이드로 이동
     * - mainSwiper.slidePrev(): 이전 슬라이드로 이동
     * - mainSwiper.slideTo(index): 특정 인덱스 슬라이드로 이동
     * - mainSwiper.autoplay.start(): 자동 재생 시작
     * - mainSwiper.autoplay.stop(): 자동 재생 정지
     * - mainSwiper.destroy(): 스와이퍼 인스턴스 제거
     * 
     * mainSwiper 객체의 주요 속성들:
     * 
     * - mainSwiper.activeIndex: 현재 활성 슬라이드 인덱스
     * - mainSwiper.slides: 모든 슬라이드 요소들의 배열
     * - mainSwiper.isBeginning: 첫 번째 슬라이드인지 여부
     * - mainSwiper.isEnd: 마지막 슬라이드인지 여부
     */

    // 재생/정지 버튼 이벤트 리스너 추가

    // 수정된 경로
    const pauseBtn = document.querySelector('main .container .swiper .swiperControlWrap .pausePlayBtns .pauseBtn');
    const playBtn = document.querySelector('main .container .swiper .swiperControlWrap .pausePlayBtns .playBtn');
    
    // 정지 버튼 클릭 시
    pauseBtn.addEventListener('click', function() {
        mainSwiper.autoplay.stop(); // 자동 재생 정지
        pauseBtn.style.display = 'none'; // 정지 버튼 숨김
        playBtn.style.display = 'block'; // 재생 버튼 표시
    });
    
    // 재생 버튼 클릭 시
    playBtn.addEventListener('click', function() {
        mainSwiper.autoplay.start(); // 자동 재생 시작
        playBtn.style.display = 'none'; // 재생 버튼 숨김
        pauseBtn.style.display = 'block'; // 정지 버튼 표시
    });
    
    // 초기 상태 설정 (자동 재생이 시작되므로 정지 버튼만 표시)
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';

    // ====동영상 로딩 상태 제어 시작================
    const videoWraps = document.querySelectorAll('.mediaWrap');
    
    videoWraps.forEach(wrap => {
        const video = wrap.querySelector('video');
        if (!video) return;
        
        // 초기 상태 설정
        wrap.classList.remove('loading', 'loaded');
        
        // 로딩 시작 시
        video.addEventListener('loadstart', function() {
            console.log('Video loading started');
            wrap.classList.add('loading');
            wrap.classList.remove('loaded');
        });
        
        // 로딩 진행 중
        video.addEventListener('progress', function() {
            console.log('Video loading progress');
        });
        
        // 로딩 완료 시
        video.addEventListener('canplay', function() {
            console.log('Video can play');
            wrap.classList.remove('loading');
            wrap.classList.add('loaded');
        });
        
        // 로딩 실패 시 fallback 이미지 유지
        video.addEventListener('error', function(e) {
            console.error('Video loading error:', e);
            wrap.classList.remove('loading', 'loaded');
        });
        
        // 추가 이벤트 리스너들
        video.addEventListener('loadeddata', function() {
            console.log('Video data loaded');
        });
        
        video.addEventListener('loadedmetadata', function() {
            console.log('Video metadata loaded');
        });
    });
    // ====동영상 로딩 상태 제어 끝=================


    // ====Swiper 컨트롤(.swiperControlWrap) 위치 동적 조정 시작================
    
    // Swiper 컨트롤 위치 동적 조정 함수
    function adjustSwiperControlPosition() {
        try {
            const swiperControlWrap = document.querySelector('main .container .swiper .swiperControlWrap');
            const swiperContainer = document.querySelector('main .container .swiper');
            const mediaWrap = document.querySelector('main .container .swiper .swiper-wrapper .swiper-slide .mediaWrap');
            
            if (!swiperControlWrap || !swiperContainer) {
                console.warn('Swiper control or swiper container elements not found');
                return;
            }
            
            // 화면 너비 확인 (PC 스타일 감지)
            const isPC = window.innerWidth >= 1025;
            
            if (isPC) {
                // PC 버전은 top값을 JS로 계산하지 않고, CSS에서만 제어함
                swiperControlWrap.style.top = '';
                // 필요시 기존에 JS로 설정된 top값을 초기화
                console.log('PC style: Swiper controlWrap top값은 CSS에서 제어');
            } else {
                // 모바일/태블릿에서는 기존 방식 (mediaWrap 높이 + 10px)
                if (!mediaWrap) {
                    console.warn('Media wrap element not found for mobile/tablet calculation');
                    return;
                }
                const mediaWrapHeight = mediaWrap.offsetHeight;
                const topPosition = mediaWrapHeight + 10;
                swiperControlWrap.style.top = topPosition + 'px';
                
                console.log('Mobile/Tablet: Swiper control position adjusted:', {
                    mediaWrapHeight: mediaWrapHeight,
                    topPosition: topPosition
                });
            }
            
        } catch (error) {
            console.error('Error adjusting swiper control position:', error);
        }
    }
    
    // 초기 위치 조정 (페이지 로드 후)
    setTimeout(adjustSwiperControlPosition, 100);
    
    // 윈도우 리사이즈 시 위치 재조정 (디바운싱 적용)
    window.addEventListener('resize', debounce(adjustSwiperControlPosition, 250));
    
    // Swiper 슬라이드 변경 시에도 위치 조정
    mainSwiper.on('slideChange', function() {
        setTimeout(adjustSwiperControlPosition, 100);
    });
    
    // Swiper 초기화 완료 후 위치 조정
    mainSwiper.on('init', function() {
        setTimeout(adjustSwiperControlPosition, 100);
    });
    
    // ====Swiper 컨트롤 위치 동적 조정 끝================
});
//====Swiper 슬라이더 초기화 및 설정 끝=============================


// ====Swiper 슬라이더 내부 동영상 로딩 상태 제어 시작================


// 동영상 로딩 상태 제어
document.addEventListener('DOMContentLoaded', function() {
    const videoWraps = document.querySelectorAll('.mediaWrap');
    
    videoWraps.forEach(wrap => {
        const video = wrap.querySelector('video');
        if (!video) return;
        
        // 로딩 시작 시
        video.addEventListener('loadstart', function() {
            wrap.classList.add('loading');
            wrap.classList.remove('loaded');
        });
        
        // 로딩 완료 시
        video.addEventListener('canplay', function() {
            wrap.classList.remove('loading');
            wrap.classList.add('loaded');
        });
        
        // 로딩 실패 시 fallback 이미지 유지
        video.addEventListener('error', function() {
            wrap.classList.remove('loading', 'loaded');
        });
    });
});


// ====Swiper 슬라이더 내부 동영상 로딩 상태 제어 끝=================






//====전역함수, 전역변수 시작===================================================
/**
 * .txtWrap 높이를 가장 큰 높이로 고정하는 전역 함수
 */
function setEqualHeight() {
    const $txtWraps = $('.swiper-slide .txtWrap');
    
    // 높이 초기화
    $txtWraps.css('height', 'auto');
    
    // 가장 큰 높이 찾기 및 적용
    const maxHeight = Math.max.apply(null, $txtWraps.map(function() {
        return $(this).outerHeight();
    }).get());
    
    $txtWraps.css('height', maxHeight + 'px');
}

// 디바운싱 함수 (성능 최적화)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 디바운싱 적용된 높이 설정 함수
const debouncedSetEqualHeight = debounce(setEqualHeight, 250);


//====전역함수, 전역변수 끝==============================================




//====제이쿼리 호출 시작=================================================
$(document).ready(function() {
    
    // 윈도우 리사이즈 시 높이 재계산 (디바운싱 적용)
    $(window).on('resize', debouncedSetEqualHeight);
    
    // 페이지 로드 완료 후 높이 설정
    $(window).on('load', function() {
        setEqualHeight();
    });
});
//====제이쿼리 호출 끝===================================================

// 동영상 로딩 상태 디버깅 함수
function debugVideoLoading() {
    const videoWraps = document.querySelectorAll('.mediaWrap');
    
    videoWraps.forEach((wrap, index) => {
        const video = wrap.querySelector('video');
        if (!video) {
            console.log(`Video ${index}: No video element found`);
            return;
        }
        
        console.log(`Video ${index}:`, {
            src: video.src,
            readyState: video.readyState,
            networkState: video.networkState,
            currentSrc: video.currentSrc
        });
        
        // 비디오 상태 모니터링
        const checkVideoState = () => {
            console.log(`Video ${index} state:`, {
                readyState: video.readyState,
                networkState: video.networkState,
                paused: video.paused,
                ended: video.ended,
                currentTime: video.currentTime,
                duration: video.duration
            });
        };
        
        // 1초마다 상태 체크 (개발 중에만 사용)
        // setInterval(checkVideoState, 1000);
    });
}

// 페이지 로드 완료 후 디버깅 실행
window.addEventListener('load', function() {
    setTimeout(debugVideoLoading, 1000);
});







