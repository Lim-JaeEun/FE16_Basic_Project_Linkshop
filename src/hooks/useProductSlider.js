import { useRef, useEffect, useState } from 'react';

import throttle from 'lodash.throttle';

export const useSlider = (isLargeScreen, itemWidth = 95, gap = 8) => {
  const [showAmount, setShowAmount] = useState(1);

  const sliderRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleAutoPlay = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPlay(); // slickPlay() 메서드 호출
    }
  };

  // 마우스 이탈 시 자동 재생 정지
  const handleRemoveAutoPlay = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPause(); // slickPause() 메서드 호출
    }
  };
  const calcHowManySlides = (layoutWidth, itemWidth, gap) => {
    if (
      layoutWidth === null ||
      layoutWidth === undefined ||
      layoutWidth <= 0 ||
      isNaN(layoutWidth)
    ) {
      return 1; // 유효하지 않은 값일 경우 최소 1개 반환
    }
    if (itemWidth + gap <= 0) {
      return 1; // 0으로 나누기 방지
    }
    const calculatedSlides = Math.floor(
      (layoutWidth + gap) / (itemWidth + gap),
    );

    return Math.max(1, calculatedSlides); // 최소 1개 보장
  };
  function gotoFirstSlideItem() {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0, true);
    }
  }
  useEffect(() => {
    gotoFirstSlideItem();
  }, [isLargeScreen]);

  useEffect(() => {
    const updateListWidthAndShowAmount = () => {
      if (wrapperRef.current) {
        setShowAmount(calcHowManySlides(wrapperRef.current.offsetWidth, 95, 8));
      }
      gotoFirstSlideItem();
    };
    const throttleEvent = throttle(updateListWidthAndShowAmount, 200, {
      leading: true,
      trailing: true,
    });

    updateListWidthAndShowAmount();

    window.addEventListener('resize', throttleEvent);

    return () => {
      window.removeEventListener('resize', throttleEvent);
    };
  }, []);

  const sliderSettings = {
    dots: false, // 하단에 점(dot) 내비게이션 표시
    infinite: false, // 마지막 슬라이드에서 멈춤 (false: 루프 안 함, true: 루프 함)
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: showAmount, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한 번 스크롤/슬라이드 시 넘어갈 슬라이드 개수
    arrows: false, // 좌우 화살표 내비게이션 표시
    draggable: true,
    cssEase: 'linear',
    autoplay: false, // 초기 자동 재생은 false로 설정합니다.
    autoplaySpeed: 1000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, // 화면 너비가 1024px 이하일 때, (아이패드프로기준)
        settings: {
          arrows: true,
        },
      },
    ],
  };

  return {
    sliderRef,
    wrapperRef,
    showAmount,
    sliderSettings,
    handleAutoPlay,
    handleRemoveAutoPlay,
  };
};
