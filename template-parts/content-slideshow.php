

<div class="hero-slider__slide" style="background-image: url(<?php the_field('slide_photograph'); ?>)">
  <div class="hero-slider__interior container">
    <div class="hero-slider__overlay">
      <h2 class="headline headline--medium t-center"><?php the_field('slide_title') ?></h2>
      <p class="t-center"><?php (get_field('slide_subtitle')) ?></p>
      <p class="t-center no-margin"><a href="<?php the_field('slide_link_value')?>" class="btn btn--blue"><?php the_field('slide_link_text')?></a></p>
    </div>
  </div>
</div>