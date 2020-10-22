<template>
    <div>
        <!-- Svg Filters -->
        <filter id="svg-glow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="2" result="offsetblur" />
            <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>

        <div style="display:none">
            <span id="marker_template" class="marker">
                <span class="name"></span>
            </span>

            <span id="legacy_marker_template" class="legacymarker">
                <span class="name"></span>
            </span>
        </div>

        <div id="layout">
            <div id="visualization">
                <div id="css-container">
                    <div id="css-world">
                        <div id="css-camera">
                            <!-- 2D overlay elements go in here -->
                        </div>
                    </div>
                </div>
                <div id="glContainer">
                    <!-- 3D webgl canvas here -->
                </div>
            </div>

            <div id="icon-nav"></div>

            <div id="spectral-graph">
                <!-- <img src="images/spectral_color_index.png" border="0"> -->
                <div id="heat-map"></div>
                <p class="left">3,840&deg;K (cooler)</p>
                <p class="center">7,300&deg;K</p>
                <p class="right">42,000&deg;K (hotter)</p>
                <h5>
                    B-V Stellar Color Index <br /> Temperatures in Kelvin
                </h5>
            </div>

            <div id="detailContainer" style="padding-top: 10%;">
                <div id="detailTitle">
                    <span>Sun</span>
                    <div id="detailClose">
                        <p id="zoom-back">
                        </p>
                        <p id="ex-out">
                            &times;
                        </p>
                    </div>
                </div>
                <div id="detailBody">
                    <p>
                        The <b>Sun</b> is the <a href="http://en.wikipedia.org/wiki/Star" title="Star">star</a> at the center of the <a href="http://en.wikipedia.org/wiki/Solar_System" title="Solar System">Solar System</a>. It is almost perfectly <a href="http://en.wikipedia.org/wiki/Sphere"
                            title="Sphere">spherical</a> and consists of hot <a href="http://en.wikipedia.org/wiki/Plasma_(physics)" title="Plasma (physics)">plasma</a> interwoven with <a href="http://en.wikipedia.org/wiki/Magnetic_field" title="Magnetic field">magnetic fields</a>.
                        <sup
                            id="cite_ref-11" class="reference"><a href="http://en.wikipedia.org/wiki/Sun#cite_note-11"><span>[</span>12<span>]</span></a></sup><sup id="cite_ref-12" class="reference"><a href="http://en.wikipedia.org/wiki/Sun#cite_note-12"><span>[</span>13<span>]</span></a></sup>                        It has a <a href="http://en.wikipedia.org/wiki/Diameter" title="Diameter">diameter</a> of about 1,392,684 km,<sup id="cite_ref-arxiv1203_4898_4-2" class="reference"><a href="http://en.wikipedia.org/wiki/Sun#cite_note-arxiv1203_4898-4"><span>[</span>5<span>]</span></a></sup>                        about 109&nbsp;times that of <a href="http://en.wikipedia.org/wiki/Earth" title="Earth">Earth</a>, and its mass (about 2<span style="margin:0 .15em 0 .25em">×</span>10<sup>30</sup>&nbsp;kilograms, 330,000&nbsp;times that of Earth)
                            accounts for about 99.86% of the total mass of the Solar System.<sup id="cite_ref-Woolfson00_13-0" class="reference"><a href="http://en.wikipedia.org/wiki/Sun#cite_note-Woolfson00-13"><span>[</span>14<span>]</span></a></sup> Chemically,
                            about three quarters of the Sun's mass consists of <a href="http://en.wikipedia.org/wiki/Hydrogen" title="Hydrogen">hydrogen</a>, while the rest is mostly <a href="http://en.wikipedia.org/wiki/Helium" title="Helium">helium</a>.
                            The remainder (1.69%, which nonetheless equals 5,628&nbsp;times the mass of Earth) consists of heavier elements, including <a href="http://en.wikipedia.org/wiki/Oxygen" title="Oxygen">oxygen</a>, <a href="http://en.wikipedia.org/wiki/Carbon"
                                title="Carbon">carbon</a>, <a href="http://en.wikipedia.org/wiki/Neon" title="Neon">neon</a> and <a href="http://en.wikipedia.org/wiki/Iron" title="Iron">iron</a>, among others.<sup id="cite_ref-basu2008_14-0" class="reference"><a href="http://en.wikipedia.org/wiki/Sun#cite_note-basu2008-14"><span>[</span>15<span>]</span></a></sup>
                            <span
                                id="why_the_sun_is_yellow"></span>
                    </p>
                    <p>
                        Excerpt from <a href="http://en.wikipedia.org/wiki/Sun" id="excerpt-link">Wikipedia.</a>
                    </p>
                </div>
            </div>
        </div>

        <div id="star-name">
            <span>Sun</span>
        </div>

        <div id="meta">
            <p>
                <!-- Stuff info here! -->
            </p>
        </div>

        <div id="minimap">
            <div id="volume">
                <!-- 				<img src="images/icons/sound-on.svg" alt="" /> -->
            </div>
            <div id="zoom-levels">
                <div id="zoom-backdrop"></div>
                <div id="zoom-cursor"></div>
            </div>
            <div id="about">?</div>
        </div>

        <div id="loader">
            <div>
                <img src="./images/loading6.gif" width="50" height="50" alt="" border="0" /></img>
                <p id="loadtext">Loading the galaxy, please wait&hellip;</p>
            </div>
        </div>

        <audio id="bgmusicA" src="audio/bgmusic.ogg">
            </audio>
        <audio id="bgmusicB" src="audio/bgmusic.ogg">
            </audio>
        </div>
</template>

<script>
export default {
  name: 'main'
}
</script>

<style lang="scss" scoped>
/**
 * Mixins and variables
 */

/**
 * Styles for page
 */

* {
    margin: 0;
    padding: 0;
}

body {
    background-color: #000000;
    font-size: 14px;
    line-height: 20px;
    margin: 0;
    overflow: hidden;
    font-family: 'Lora', Georgia, serif;
    position: fixed;
}

#loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: #000;
}

#loader div {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -80px;
    margin-left: -250px;
    text-align: center;
}

#loader p {
    color: #fff;
    width: 500px;
    font-size: 21px;
    line-height: 40px;
    font-style: italic;
    font-weight: normal;
    padding-bottom: 20px;
    text-shadow: 0 0 3px #fff, 0 0 10px #000;
}

.marker {
    font-family: 'Lekton', monospace;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    /*
   Introduced in IE 10.
   See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
  */
    -ms-user-select: none;
    user-select: none;
    position: absolute;
    padding: 0px 0px;
    cursor: pointer;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -webkit-transition: opacity 0.5s;
    -moz-transition: opacity 0.5s;
    -ms-transition: opacity 0.5s;
    -o-transition: opacity 0.5s;
    transition: opacity 0.5s;
}

.marker span.name {
    color: #fff;
    text-shadow: 0 0 3px #fff, 0 0 10px #000;
    -webkit-transition: text-shadow 0.25s;
    -moz-transition: text-shadow 0.25s;
    -ms-transition: text-shadow 0.25s;
    -o-transition: text-shadow 0.25s;
    transition: text-shadow 0.25s;
}

.marker span.name:hover {
    text-shadow: 0 0 3px #fff, 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff;
}

.marker.label span.name {
    cursor: default !important;
    font-size-adjust: none;
}

.marker.label span.name:hover {
    text-shadow: 0 0 3px #fff, 0 0 10px #000 !important;
}

.marker span.name {
    color: #fff;
    text-shadow: 0 0 3px #fff, 0 0 10px #000;
    -webkit-transition: text-shadow 0.25s;
    -moz-transition: text-shadow 0.25s;
    -ms-transition: text-shadow 0.25s;
    -o-transition: text-shadow 0.25s;
    transition: text-shadow 0.25s;
}

.marker span.name:hover {
    text-shadow: 0 0 3px #fff, 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff;
}

.legacymarker {
    font-family: 'Lekton', monospace;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    /*
   Introduced in IE 10.
   See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
  */
    -ms-user-select: none;
    user-select: none;
    position: absolute;
    padding: 6px 8px;
    min-width: 140px;
    -webkit-transition: opacity 0.5s;
    -moz-transition: opacity 0.5s;
    -ms-transition: opacity 0.5s;
    -o-transition: opacity 0.5s;
    transition: opacity 0.5s;
    display: inline;
}

.legacymarker span.name {
    display: inline-block;
    width: 100%;
    color: #fff;
    text-shadow: 0.1em 0.1em 4px #000;
    -webkit-transition: text-shadow 0.25s;
    -moz-transition: text-shadow 0.25s;
    -ms-transition: text-shadow 0.25s;
    -o-transition: text-shadow 0.25s;
    transition: text-shadow 0.25s;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
}

@keyframes aura {
    from {
        -webkit-box-shadow: inset 0 0 1px white;
        -moz-box-shadow: inset 0 0 1px white;
        -ms-box-shadow: inset 0 0 1px white;
        -o-box-shadow: inset 0 0 1px white;
        box-shadow: inset 0 0 1px white;
    }
    to {
        -webkit-box-shadow: inset 0 0 50px white;
        -moz-box-shadow: inset 0 0 50px white;
        -ms-box-shadow: inset 0 0 50px white;
        -o-box-shadow: inset 0 0 50px white;
        box-shadow: inset 0 0 50px white;
    }
}

@-moz-keyframes aura {
    from {
        -webkit-box-shadow: inset 0 0 1px white;
        -moz-box-shadow: inset 0 0 1px white;
        -ms-box-shadow: inset 0 0 1px white;
        -o-box-shadow: inset 0 0 1px white;
        box-shadow: inset 0 0 1px white;
    }
    to {
        -webkit-box-shadow: inset 0 0 50px white;
        -moz-box-shadow: inset 0 0 50px white;
        -ms-box-shadow: inset 0 0 50px white;
        -o-box-shadow: inset 0 0 50px white;
        box-shadow: inset 0 0 50px white;
    }
}

@-webkit-keyframes aura {
    from {
        -webkit-box-shadow: inset 0 0 1px white;
        -moz-box-shadow: inset 0 0 1px white;
        -ms-box-shadow: inset 0 0 1px white;
        -o-box-shadow: inset 0 0 1px white;
        box-shadow: inset 0 0 1px white;
    }
    to {
        -webkit-box-shadow: inset 0 0 50px white;
        -moz-box-shadow: inset 0 0 50px white;
        -ms-box-shadow: inset 0 0 50px white;
        -o-box-shadow: inset 0 0 50px white;
        box-shadow: inset 0 0 50px white;
    }
}

@-o-keyframes aura {
    from {
        -webkit-box-shadow: inset 0 0 1px white;
        -moz-box-shadow: inset 0 0 1px white;
        -ms-box-shadow: inset 0 0 1px white;
        -o-box-shadow: inset 0 0 1px white;
        box-shadow: inset 0 0 1px white;
    }
    to {
        -webkit-box-shadow: inset 0 0 50px white;
        -moz-box-shadow: inset 0 0 50px white;
        -ms-box-shadow: inset 0 0 50px white;
        -o-box-shadow: inset 0 0 50px white;
        box-shadow: inset 0 0 50px white;
    }
}

@-ms-keyframes aura {
    from {
        -webkit-box-shadow: inset 0 0 1px white;
        -moz-box-shadow: inset 0 0 1px white;
        -ms-box-shadow: inset 0 0 1px white;
        -o-box-shadow: inset 0 0 1px white;
        box-shadow: inset 0 0 1px white;
    }
    to {
        -webkit-box-shadow: inset 0 0 50px white;
        -moz-box-shadow: inset 0 0 50px white;
        -ms-box-shadow: inset 0 0 50px white;
        -o-box-shadow: inset 0 0 50px white;
        box-shadow: inset 0 0 50px white;
    }
}

#icon-nav {
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px 20px 16px 20px;
}

#icon-nav #tour-button {
    margin-top: -3.33333px;
    opacity: 1.0;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    border-radius: 50%;
    -webkit-animation-name: aura;
    -moz-animation-name: aura;
    animation-name: aura;
    -webkit-animation-duration: 2s;
    -moz-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    -moz-animation-direction: alternate;
    animation-direction: alternate;
    -webkit-animation-timing-function: ease-in-out;
    -moz-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    -webkit-transition: background 0.25s;
    -moz-transition: background 0.25s;
    -ms-transition: background 0.25s;
    -o-transition: background 0.25s;
    transition: background 0.25s;
}

#icon-nav #tour-button:hover {
    -webkit-animation-play-state: paused;
    -moz-animation-play-state: paused;
    animation-play-state: paused;
    background: rgba(255, 255, 255, 0.66);
}

#icon-nav>* {
    opacity: 0.8;
    vertical-align: top;
    cursor: pointer;
    display: inline-block;
}

#icon-nav>*:not(#tour-button) {
    -webkit-transition: opacity 0.25s;
    -moz-transition: opacity 0.25s;
    -ms-transition: opacity 0.25s;
    -o-transition: opacity 0.25s;
    transition: opacity 0.25s;
}

#icon-nav>*:hover {
    opacity: 1.0;
}

#icon-nav>*:not(:first-child) {
    margin-left: 10px;
}

#spectral-graph {
    position: absolute;
    left: 0;
    top: 67px;
    color: #fff;
    font-family: 'Lekton', monospace;
    display: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    /*
   Introduced in IE 10.
   See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
  */
    -ms-user-select: none;
    user-select: none;
    padding: 24px 20px 20px 20px;
    -webkit-transition: opacity 0.25s;
    -moz-transition: opacity 0.25s;
    -ms-transition: opacity 0.25s;
    -o-transition: opacity 0.25s;
    transition: opacity 0.25s;
    opacity: 0.8;
}

#spectral-graph:hover,
#spectral-graph.heatvision {
    opacity: 1.0;
}

#spectral-graph p {
    position: absolute;
    width: 300px;
    top: 42px;
    left: 20px;
    font-size: 12px;
}

#spectral-graph p.left {
    text-align: left;
}

#spectral-graph p.center {
    text-align: center;
}

#spectral-graph p.right {
    text-align: right;
}

#spectral-graph h5 {
    margin-top: 30px;
}

#spectral-graph #heat-map {
    width: 300px;
    height: 20px;
    background: #c8420a;
    /* Old browsers */
    background: -moz-linear-gradient(left, #c8420a 0%, #f8e141 25%, white 50%, #444fe3 98%, #be78ef 100%);
    /* FF3.6+ */
    background: -webkit-gradient(linear, left top, right top, color-stop(0%, #c8420a), color-stop(25%, #f8e141), color-stop(50%, white), color-stop(98%, #444fe3), color-stop(100%, #be78ef));
    /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(left, #c8420a 0%, #f8e141 25%, white 50%, #444fe3 98%, #be78ef 100%);
    /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(left, #c8420a 0%, #f8e141 25%, white 50%, #444fe3 98%, #be78ef 100%);
    /* Opera 11.10+ */
    background: -ms-linear-gradient(left, #c8420a 0%, #f8e141 25%, white 50%, #444fe3 98%, #be78ef 100%);
    /* IE10+ */
    background: linear-gradient(to right, #c8420a 0%, #f8e141 25%, white 50%, #444fe3 98%, #be78ef 100%);
    /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#c8420a', endColorstr='#be78ef', GradientType=1);
    /* IE6-9 */
}

#theater .top-bar {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 67px;
    background: #000;
    margin-top: -67px;
}

#theater .bottom-bar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 67px;
    background: #000;
    margin-bottom: -67px;
}

#theater .message {
    position: absolute;
    top: 75%;
    left: 0;
    right: 0;
    text-align: center;
}

#theater .message p {
    padding: 0 100px;
    height: 40px;
    font-size: 28px;
    line-height: 40px;
    margin-top: -30px;
    color: #fff;
    font-style: italic;
    text-shadow: 0 0 3px #2c47dc, 0 0 10px #eeeeff;
}

#theater .message p span {
    padding: 10px 20px;
    background: rgba(0, 0, 0, 0.9);
}

#controlshelp {
    background-color: rgba(0, 0, 0, 0.65);
    padding: 15px;
    color: #ffffff;
    font-size: 32px;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    /*
   Introduced in IE 10.
   See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
  */
    -ms-user-select: none;
    user-select: none;
}

#layout {
    -webkit-transform: scale(1.25);
    -moz-transform: scale(1.25);
    -ms-transform: scale(1.25);
    -o-transform: scale(1.25);
    transform: scale(1.25);
    -webkit-transition: all 0.25s;
    -moz-transition: all 0.25s;
    -ms-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
}

.unselectable {
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    /*
   Introduced in IE 10.
   See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
  */
    -ms-user-select: none;
    user-select: none;
}

#star-name,
#detailTitle {
    color: #fff;
    font-size: 42px;
    line-height: 60px;
    margin: 0 0 20px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.75);
    position: relative;
    display: block;
    font-style: italic;
    text-shadow: 0 0 3px #2c47dc, 0 0 10px #eeeeff;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    /*
   Introduced in IE 10.
   See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
  */
    -ms-user-select: none;
    user-select: none;
}

#star-name {
    position: fixed;
    left: 0;
    bottom: 0;
    margin: 0 20px 25px 20px;
    width: 560px;
    display: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    /*
   Introduced in IE 10.
   See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
  */
    -ms-user-select: none;
    user-select: none;
}

#star-name span {
    cursor: pointer;
}

#detailBody {
    color: white;
    z-index: 9999;
    display: block;
    text-shadow: 0 0 7px rgba(255, 255, 255, 0.7);
}

#detailBody p:first-child {
    text-indent: 10px;
}

#detailBody p+p {
    margin-top: 20px;
}

#detailContainer {
    display: none;
    background-color: rgba(0, 0, 0, 0.75);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    padding: 0 20px 60px 20px;
    overflow: auto;
    width: 560px;
    z-index: 9999 !important;
}

#detailContainer ul {
    margin-left: 20px;
}

#detailContainer ul li {
    margin-bottom: 10px;
}

#detailFooter {
    margin-top: 20px;
    color: #ccc;
    font-size: 12px;
}

#detailClose {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    color: #fff;
    padding: 10px;
    font-size: 28px;
}

#detailClose>* {
    text-shadow: 0 0 transparent;
    display: inline-block;
    margin-left: 10px;
    opacity: 0.8;
}

#detailClose>*:hover {
    opacity: 1.0;
}

#meta {
    display: none;
    position: fixed;
    bottom: 0;
    left: 50%;
    text-align: center;
    z-index: 9999;
    color: #fff;
    -webkit-transition: text-shadow 0.25s;
    -moz-transition: text-shadow 0.25s;
    -ms-transition: text-shadow 0.25s;
    -o-transition: text-shadow 0.25s;
    transition: text-shadow 0.25s;
    text-shadow: 0 0 3px #2c47dc, 0 0 10px #eeeeff;
}

#meta p {
    vertical-align: bottom;
    padding: 20px 40px;
    background: rgba(0, 0, 0, 0.9);
}

#meta p a {
    text-decoration: none;
    font-style: italic;
    border: 0;
}

#meta:hover {
    text-shadow: 0 0 5px #fff, 0 0 10px #eeeeff;
}

div.tip {
    font-size: 14px;
    line-height: 14px;
    display: inline-block;
    font-style: italic;
    padding: 0;
    margin-top: 0;
    margin-left: 0;
    color: #fff;
}

div.tip>div {
    display: inline-block;
    vertical-align: top;
}

#minimap {
    opacity: 0.0;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    color: #fff;
    text-align: center;
    padding: 20px;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    /*
   Introduced in IE 10.
   See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
  */
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: opacity 0.25s;
    -moz-transition: opacity 0.25s;
    -ms-transition: opacity 0.25s;
    -o-transition: opacity 0.25s;
    transition: opacity 0.25s;
    z-index: 9999;
    /**
   * Zoom variables
   */
}

#minimap.ready {
    opacity: 0.8;
}

#minimap.ready:hover {
    opacity: 1.0;
}

#minimap #home {
    cursor: pointer;
    -webkit-transition: all 0.25s;
    -moz-transition: all 0.25s;
    -ms-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
}

#minimap #zoom-levels {
    left: 0;
    right: 0;
    position: relative;
    cursor: ns-resize;
    border-bottom: 2px solid white;
    border-top: 2px solid white;
    -webkit-transition: all 0.25s;
    -moz-transition: all 0.25s;
    -ms-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    margin-top: 10px;
}

#minimap #zoom-backdrop {
    position: relative;
    width: 0;
    height: 100%;
    margin: 0 auto;
    border-left: 2px solid white;
}

#minimap #zoom-cursor {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 0;
    border-top: 2px solid white;
    border-bottom: 2px solid white;
}

#minimap #about {
    position: absolute;
    font-family: 'Lekton', monospace;
    font-size: 24px;
    width: 24px;
    line-height: 27px;
    text-align: center;
    height: 24px;
    -webkit-border-radius: 24px;
    -moz-border-radius: 24px;
    -ms-border-radius: 24px;
    -o-border-radius: 24px;
    border-radius: 24px;
    -webkit-transition: all 0.25s;
    -moz-transition: all 0.25s;
    -ms-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    font-weight: bold;
    cursor: pointer;
    bottom: 20px;
    margin-left: -2px;
}

#minimap #volume {
    cursor: pointer;
    width: 24px;
    height: 24px;
}

#minimap #tour {
    position: absolute;
    font-family: 'Lekton', monospace;
    font-size: 14px;
    width: 50px;
    line-height: 23px;
    text-align: center;
    height: 20px;
    -webkit-transition: all 0.25s;
    -moz-transition: all 0.25s;
    -ms-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    font-weight: bold;
    border: 1px solid #ccc;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.9) url("../images/tourhighlight.png") center center no-repeat;
    bottom: 20px;
    right: 92px;
}

#minimap #heatvision {
    position: absolute;
    font-family: 'Lekton', monospace;
    font-size: 14px;
    width: 105px;
    line-height: 23px;
    text-align: center;
    height: 20px;
    -webkit-transition: all 0.25s;
    -moz-transition: all 0.25s;
    -ms-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    font-weight: bold;
    border: 1px solid #ccc;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.9) url("../images/tourhighlight.png") center center no-repeat;
    bottom: 20px;
    right: 156px;
}

#minimap #sound {
    cursor: pointer;
    -webkit-transition: all 0.25s;
    -moz-transition: all 0.25s;
    -ms-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    bottom: 13px;
    right: 54px;
    position: absolute;
    visibility: visible;
}

#minimap #soundoff {
    cursor: pointer;
    -webkit-transition: all 0.25s;
    -moz-transition: all 0.25s;
    -ms-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    bottom: 13px;
    right: 54px;
    position: absolute;
    display: none;
}

sup {
    vertical-align: super;
    font-size: 9.24px;
    line-height: 0;
}

.reference {
    display: none;
    visibility: hidden;
}

a {
    -webkit-transition: border 0.25s;
    -moz-transition: border 0.25s;
    -ms-transition: border 0.25s;
    -o-transition: border 0.25s;
    transition: border 0.25s;
}

a:link,
a:active,
a:visited {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

a:hover {
    border-bottom: 1px solid rgba(0, 0, 0, 0);
    text-decoration: none;
}

::selection,
::-moz-selection {
    background: #2c47dc;
}

#css-world {
    width: 100%;
    height: 100%;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    position: absolute;
}

#css-camera {
    width: 100%;
    height: 100%;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    position: absolute;
}

#css-container {
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    position: absolute;
}

canvas {
    pointer-events: none;
    z-index: 10;
}

#chrome-experiments {
    width: 141px;
    height: 72px;
}

#chrome-experiments a {
    border-bottom: 0px;
}
</style>
