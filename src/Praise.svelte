<script>
  import praiseImg1 from './images/praise/1.png';
  import praiseImg2 from './images/praise/2.png';
  import praiseImg3 from './images/praise/3.png';
  import praiseImg4 from './images/praise/4.png';
  import praiseImg5 from './images/praise/5.png';
  import praiseImg6 from './images/praise/6.png';
  import praiseImg7 from './images/praise/7.png';
  import praiseImg8 from './images/praise/8.png';
  import praiseImg9 from './images/praise/9.png';
  import praiseImg10 from './images/praise/10.png';
  import praiseImg11 from './images/praise/11.png';
  import praiseImg12 from './images/praise/12.png';

  function getRandomInt(min, max) {
    const ceiledMin = Math.ceil(min);
    const flooredMax = Math.floor(max);

    // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (flooredMax - ceiledMin)) + ceiledMin;
  }
  const praiseImageList = [
    praiseImg1,
    praiseImg2,
    praiseImg3,
    praiseImg4,
    praiseImg5,
    praiseImg6,
    praiseImg7,
    praiseImg8,
    praiseImg9,
    praiseImg10,
    praiseImg11,
    praiseImg12,
  ];
  const praiseImg = praiseImageList[getRandomInt(0, praiseImageList.length)];
</script>

<style>
  .praise-box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .praise-image {
    margin-top: 1em;
  }
</style>

<div class="praise-box">
  <span class="praise-text">Ура! Все круги прочитаны!</span>
  <img
    class="praise-image"
    src={praiseImg}
    alt="Вы молодец!"
    width="300"
    height="300" />
</div>
