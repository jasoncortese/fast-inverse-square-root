## Fast Inverse Square Root Algorithm
#### (or, evil floating point bit level hacking)


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px;"><br/> Origins...</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Around the turn of the century on a Usenet public forum, someone posted this method pulled from the depths of the source code for Quake III...</div>
@snapend

@snap[midpoint span-75 text-06]
```c
float Q_rsqrt( float number ) {
    float x2 = number * 0.5F;
    float y  = number;
    long i  = * ( long * ) &y;                  // evil floating point bit level hacking
    i  = 0x5f3759df - ( i >> 1 );               // what the fuck?
    y  = * ( float * ) &i;
    y  = y * ( threehalfs - ( x2 * y * y ) );   // 1st iteration
//    y  = y * ( threehalfs - ( x2 * y * y ) ); // 2nd iteration, this can be removed

    return y;
}
```
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-top: -150px; text-align: left;">This was originally credited to John Carmack who was lead programmer on the project, but can be traced back to Greg Walsh and Cleve Moler working at Ardent Computers.</div>
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> Math is hard, m'kay?</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">In 3D graphics you do a lot of normalizing vectors, and that involves a lot of inverses and square roots, both of which are expensive operations (back then, quadruply so).</div>
@snapend

<div class="midpoint span-75 text-06">
`\[y = {1 \over \sqrt{x}} = x^{-\frac{1}{2}}\]
\[\log_2 y = -{\small\frac{1}{2}} {\log_2 x}\]
\[\log_2 y \approx (x - 1) + \sigma\]
\[\]
\[y \approx {{2}}^{(x - 1)} {{2}}^\sigma\]
\[y' \approx -{{3y - {x}{y^3}} \over {2}}\]`
</div>

@snap[south span-85 text-05 text-black fragment]
<div style="margin-top: -150px; text-align: left;">Logarithms would simplify these calculations, and logarithms can be linearly approximated. Now let's take a look at...</div>
@snapend

@snap[east span-25]
@img[](ln.png)
@img[](0.5.png)
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> IEEE</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">A single-precision floating point number, where s is the sign bit, e are the 8 bits of the exponent E, and m are the 23 significant bits of the mantissa M.</div>
<div><span style="color: orange;">s</span> <span style="color: green;">e e e e e e e e</span> <span style="color: red;">m m m m m m m m m m m m m m m m m m m m m m m</span></div>
@snapend

<div class="midpoint span-75 text-06">
`\[m = {\frac{M}{L}}\]
\[e = E - B\]
\[\]
\[{\large{F}} \rightarrow (m + 1) 2^e\]
\[\]
\[{\large{I}} \rightarrow M + L E\]`
</div>

@snap[south span-85 text-05 text-black fragment]
<div style="margin-top: -150px; text-align: left;">For these 32-bit numbers the bias B is 127, and the length L is 2^23. Given these, it is easy to convert between a floating point number and its integer interpretation.</div>
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> IEEE-yai-yai</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Substituting our float representation into the inverse square root equation, this reduces to a form that approximates our integer representation. </div>
@snapend

<div class="midpoint span-75 text-06">
`\[\log_2 (m_y + 1) + e_y = -{\small\frac{1}{2}} {\log_2 (m_x + 1) + e_x}\]
\[m_y + \sigma + e_y \approx -{\small\frac{1}{2}} (m_x + \sigma + e_x)\]
\[{\frac{M_y}{L}} + E_y + \sigma \approx -{\small\frac{1}{2}} ({\frac{M_x}{L}} + E_x + \sigma)\]
\[{M_y} + LE_y \approx {\small\frac{3}{2}} L(B - \sigma) -{\small\frac{1}{2}}(M_x + LE_x)\]
\[{\large{I}_y} \approx {\small\frac{3}{2}} L(B - \sigma) -{\small\frac{1}{2}}{\large{I}_x}\]`
</div>

@snap[south span-85 text-05 text-black]
<div style="margin-top: -150px; text-align: left;">Look familiar? <br/>
<center class="fragment">`i  = 0x5f3759df - ( i >> 1 );`</center></div>
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> The Magic Number</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">We're looking for three-halves of a constant K, from which we can subtract one-half of the integer to approximate the inverse square root of the float.</div>
@snapend

<div class="midpoint span-75 text-06">
`\[{\large{I}_y} \approx {\small\frac{3}{2}} K -{\small\frac{1}{2}}{\large{I}_x}\]
\[\]
\[K = L(B - \sigma) = (2^{23}) (127 - 0.0450465)\]
\[\]
\[K = 1064975338\]
\[\]
\[{\small\frac{3}{2}} K = 1597463007\]`
<div style="margin-left: 40px;" class="fragment">
`\[= 0x5f3759df\]`
</div>
</div>

@snap[south span-85 text-05 text-black fragment]
<div style="margin-top: -150px; text-align: left;">We found our magic number!</div>
<div style="text-align: left; font-size: 12px;">(Note, we chose a value for σ = 0.0450465 which yields our magic number directly, while research has shown σ = 0.0450333 is more accurate.)</div>
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> More Magic Numbers</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Generalizing, we can find other magic numbers for: proper square root, cube root, etc.</div>
@snapend

<div class="midpoint span-75 text-06">
`\[{\large{I}_y} \approx (1-n) K + {p}{\large{I}_x}\]
\[(1 - p) K = (1 - p) (2^{23}) (127 - \sigma)\]
\[\]
\[{\small\frac{1}{2}} K = 0x1fbd1df5\]
\[\]
\[{\small\frac{2}{3}} K = 0x2a517d3c\]
\[\]
\[K = 0x3f7a3bea\]`
</div>

@snap[south span-85 text-05 text-black fragment]
<div style="margin-top: -150px; text-align: left;">These are fractions of our constant K, which as a float is approximately equal to 1.</div>
<div style="text-align: left; font-size: 12px;">(Note, the float value of K = 1 - σ/2 = 0.97747675, slightly less than 1 to minimize the error in our linear approximation.)</div>
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> What the F?</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">We can now make sense of the original function: <i>shift right for the square root, negate for the inverse, and our magic number is simply three-halves.</i></div>
@snapend

@snap[midpoint span-75 text-06]
```c
float Q_rsqrt( float number ) {
    float x2 = number * 0.5F;
    float y  = number;
    long i  = * ( long * ) &y;                   // alias as integer
    i  >>= 1 ;                                   // shift right as integer
    i  *= -1 ;                                   // negate as integer
    i  += 0x5f3759df;                            // add the magic number
    y  = * ( float * ) &i;                       // alias as float
    y  = y * ( threehalfs - ( x2 * y * y ) );    // apply newton's method
    return y;
}
```
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-top: -150px; text-align: left;">... Apply one iteration of Newton's method, and we have a surprisingly accurate approximation for the inverse square root!</div>
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> What the Ph?</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">It turns out the most interesting thing here isn't the magic number itself, but that: <br/> <i>aliasing a float as an integer approximates a logarithmic operation!</i></div>
@snapend

<div class="midpoint span-75 text-04">
<table>
  <tr>
    <th>Integer Operation</th>
    <th>Float Operation</th>
  </tr>
  <tr>
    <td>shift right</td>
    <td>square root</td>
  </tr>
  <tr>
    <td>shift left</td>
    <td>square</td>
  </tr>
  <tr>
    <td>division</td>
    <td>root extraction</td>
  </tr>
  <tr>
    <td>multiplication</td>
    <td>power function</td>
  </tr>
  <tr>
    <td>negation</td>
    <td>inverse</td>
  </tr>
  <tr>
    <td>subtraction</td>
    <td>division</td>
  </tr>
  <tr>
    <td>addition</td>
    <td>multiplication</td>
  </tr>
  <tr>
    <td>magic number</td>
    <td>denormalized fraction</td>
  </tr>
</table>
</div>

@snap[south span-85 text-05 text-black fragment]
<div style="margin-top: -150px; text-align: left;">We're going to call this, "`prosthaphaeresis`" &mdash; an old-timey term for logarithmic-like approximations before logarithms were invented &mdash; or "`phast`" for short.</div>
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> Inverse Square Root</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Now let's turn to JavaScript... </div>
@snapend

@snap[midpoint span-75 text-06]
```javascript
const buffer = new ArrayBuffer(4);
const f$ = new Float32Array(buffer);
const i$ = new Uint32Array(buffer);

function invsqrt(x) {
    f$[0] = x;                             // alias x
    i$[0] >>= 1;                           // phast square root
    i$[0] *= -1;                           // phast inverse
    i$[0] += 0x5f376430;                   // phast three-halves
    f$[0] *= 1.5 - (x * f$[0] ** 2);       // apply newtons method
    return f$[0];                          // return x
}
```
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-top: -150px; text-align: left;">We create a global ArrayBuffer to hold a 32-bit number, and two views on that buffer: one as a float, and one as an unsigned integer.</div>
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> More Roots</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">First order approximations for square root, cube root, and nth root functions. </div>
@snapend

@snap[midpoint span-75 text-06]
```javascript
function sqrt(x) {
    f$[0] = x;                             // alias x
    i$[0] >>= 1;                           // phast square root
    i$[0] += 0x1fbd2165;                   // phast fraction 1/2
    return f$[0];                          // return x'
}

function cbrt(x) {
    f$[0] = x;                             // alias x
    i$[0] /= 3;                            // phast cube root
    i$[0] += 0x2a5181dc;                   // phast fraction 2/3
    return f$[0];                          // return x'
}

function nthrt(n, x) {
    f$[0] = x;                             // alias x
    i$[0] /= n;                            // phast nth root
    i$[0] += (n - 1) / n * 0x3f7a3bea;     // phast fraction (1-p)
    return f$[0];                          // return x'
}
```
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-top: -150px; text-align: left;"> For the nth root we have the added step of finding the fractional multiplier.</div>
<div style="text-align: left; font-size: 12px;">(Note, we skipped the Newton iterations here, and chose a value for σ = 0.0448367 which improves accuracy with that step removed.)</div>
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> Taylor Series</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Root functions are not the only ones we can approximate in this way. Here are some Taylor series expansions for common functions...</div>
@snapend

<div class="midpoint span-75 text-06">
`\[{e^{x}} \approx {\frac{1}{0!}} + {\frac{x}{1!}} + {\frac{x^2}{2!}} + {\frac{x^3}{3!}} + \dots\]
\[{\log_e{(1+x)}} \approx {x} - {\frac{x^2}{2}} + {\frac{x^3}{3}} - {\frac{x^4}{4}} + \dots\]
\[{\sin{x}} \approx {x} - {\frac{x^3}{3!}} + {\frac{x^5}{5!}} - {\frac{x^7}{7!}} + \dots\]
\[{\cos{x}} \approx {x} - {1} - {\frac{x^2}{2!}} + {\frac{x^4}{4!}} - {\frac{x^6}{6!}} + \dots\]
\[{\tan{x}} \approx {x} + {\frac{x^3}{3}} + {\frac{2x^5}{15}} - {\frac{3x^7}{105}} + \dots\]`
</div>

@snap[south span-85 text-05 text-black fragment]
<div style="margin-top: -150px; text-align: left;">Exponential and trigonometric functions in particular are worth looking at, as they are expensive operations used frequently in video compression.</div>
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> Exponents</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">First order approximations for reciprocal, exponent and logarithm functions.</div>
@snapend

@snap[midpoint span-75 text-06]
```javascript
function rcpr(x) {
    f$[0] = x;                             // alias x
    i$[0] *= -1;                           // phast invert
    i$[0] -= 0x80000000;                   // phast fraction 1/1
    return x;                              // return x
}

function exp(x) {
    f$[0] = x;                             // alias x
    i$[0] <<= 1;                           // phast square
    i$[0] -= 0x3ff4d2bc;                   // phast fraction 4/3
    return 1 + x + f$[0];                  // return 1 + x + ½ x²
}

function log(x) {
    f$[0] = x - 1;                         // alias x
    i$[0] <<= 1;                           // phast square
    i$[0] -= 0x3ff4d2bc;                   // phast fraction 4/3
    return x - f$[0];                      // return x - ½ x²
}
```
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-top: -150px; text-align: left;"></div>
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> Trigonometry</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">First order approximations for cosine, sine, and tangent functions.</div>
@snapend

@snap[midpoint span-75 text-06]
```javascript
function cos(x) {
    f$[0] = x;                             // alias x
    i$[0] <<= 1;                           // phast square
    i$[0] -= 0x40121FB6;                   // phast fraction 1/2
    return 1 - f$[0];                      // return 1 - ½ x²
}

function sin(x) {
    f$[0] = x;                             // alias x
    i$[0] /= 3;                            // phast cube root
    i$[0] -= 0x0a946077;                   // phast fraction 1/6
    return x - f$[0];                      // return x - ⅙ x³
}

function tan(x) {
    f$[0] = x;                             // alias x
    i$[0] *= 3;                            // phast cube root
    i$[0] -= 0x1528c0ee;                   // phast fraction 1/3
    return x - f$[0];                      // return x - ⅓ x³
}
```
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-top: -150px; text-align: left;"></div>
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> Second Semester</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">First order approximations for double-angle, half-angle, and squared cosine functions.</div>
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-top: -150px; text-align: left;">Here we see an integer form of our magic numbers, a result of doing fast multiplication and division here rather than fast power and root extraction.</div>
@snapend

@snap[midpoint span-75 text-06]
```javascript
function cos_dbl(x) {
    const cosx = cos(x);                   // find cos(x)
    f$[0] = cosx;                          // alias cos(x)
    i$[0] <<= 1;                           // phast square
    i$[0] += 0x007ef486;                   // phast integer 2
    return f$[0] - 1;                      // return 2 cos²(x) - 1
}

function cos_hlf(x) {
    const cosx = cos(x);                   // find cos(x)
    f$[0] = 1 + cosx;                      // alias 1 + cos(x)
    i$[0] -= 0x007ef486;                   // phast integer 2
    i$[0] >>= 1;                           // phast square root
    i$[0] += 0x1fbd1df5;                   // phast fraction 1/2
    return f$[0];                          // return ¼ √(1 + cos(x))
}

function cos_sqd(x) {
    const cos2x = cos(2 * x);              // find cos(2x)
    f$[0] = 1 + cos2x;                     // alias 1 + cos2x
    i$[0] -= 0x007ef486;                   // phast integer -2
    return f$[0];                          // return ½ (1 + cos(2x))
}
```
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/>Conclusion...</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Nowadays the native inverse square root instruction is generally faster than the original algorithm. But this method could still be applicable for other linear approximations...</div>
@snapend

<div class="midpoint span-75 text-04">
<table>
  <tr>
    <th>Float Operation</th>
    <th>Relative Cost</th>
  </tr>
  <tr>
    <td>shift</td>
    <td style="text-align: center;">1</td>
  </tr>
  <tr>
    <td>addition</td>
    <td style="text-align: center;">1</td>
  </tr>
  <tr>
    <td>subtraction</td>
    <td style="text-align: center;">1</td>
  </tr>
  <tr>
    <td>multiplication</td>
    <td style="text-align: center;">1</td>
  </tr>
  <tr>
    <td>division</td>
    <td style="text-align: center;">4</td>
  </tr>
  <tr>
    <td>square root</td>
    <td style="text-align: center;">6</td>
  </tr>
  <tr>
    <td>sine</td>
    <td style="text-align: center;">15</td>
  </tr>
  <tr>
    <td>cosine</td>
    <td style="text-align: center;">15</td>
  </tr>
  <tr>
    <td>tangent</td>
    <td style="text-align: center;">19</td>
  </tr>
</table>
</div>

@snap[south span-85 text-05 text-black fragment]
<div style="margin-top: -150px; text-align: left;">Whether its practical or not we will leave as an exercise for the reader.</div>
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/>One More</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">We'll leave off here with an implementation of cosine, performing its own second and third-order Newton iterations with only 9 operations.</div>
@snapend

@snap[midpoint span-75 text-06]
```javascript
const buffer = new ArrayBuffer(4 * 3);
const f$ = new Float32Array(buffer);
const i$ = new Uint32Array(buffer);

function cos(x) {
    f$[0] = x;                             // alias x
    i$[0] <<= 1;                           // phast square
    i$[0] -= 0x40121fb6;                   // phast divide-by 1 x 2
    f$[1] = f$[0];                         // alias x'
    i$[1] <<= 1;                           // phast square
    i$[1] -= 0x40f1c87a;                   // phast divide-by 3 x 4
    f$[2] = f$[1];                         // alias x"
    i$[2] <<= 1;                           // phast square
    i$[2] -= 0x4102cf7b;                   // phast divide-by 5 x 6
    return 1 - f$[0] + f$[1] - f$[2];      // return 1 - ½ x²(1 - ⅓¼ x²(1 - ⅕⅙ x²))
}
```
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-top: -150px; text-align: left;">Ciao.</div>
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><small>Appendix A:</small> <br/> All the Magic Numbers</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Fractional values for use during phast power & root extraction, and integral values for use during phast multiplication & division.</div>
@snapend

@snap[midpoint span-75 text-05]
```javascript
const phastFractions = [
    [0x7ff00000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000],
    [0x7f800000, 0x3f800000, 0x1fc00000, 0x152aaaab, 0x0fe00000, 0x0cb33333, 0x0a955555, 0x09124925],
    [0x7f800000, 0x7f000000, 0x3f800000, 0x2a555555, 0x1fc00000, 0x19666666, 0x152aaaab, 0x12249249],
    [0x7f800000, 0x7f100000, 0x5f400000, 0x3f800000, 0x2fa00000, 0x2619999a, 0x1fc00000, 0x1b36db6e],
    [0x7f800000, 0x7f100000, 0x7f000000, 0x54aaaaab, 0x3f800000, 0x32cccccd, 0x2a555555, 0x24492492],
    [0x7f800000, 0x7f200000, 0x7f100000, 0x69d55555, 0x4f600000, 0x3f800000, 0x34eaaaab, 0x2d5b6db7],
    [0x7f800000, 0x7f200000, 0x7f100000, 0x7f000000, 0x5f400000, 0x4c333333, 0x3f800000, 0x366db6db],
    [0x7f800000, 0x7f200000, 0x7f100000, 0x7f100000, 0x6f200000, 0x58e66666, 0x4a155555, 0x3f800000],
];

const phastIntegers = [
     0xc0800000, 0x00000000, 0x00800000, 0x00c00000, 0x01000000, 0x01200000, 0x01400000, 0x01600000,
     0x01800000, 0x01900000, 0x01a00000, 0x01b00000, 0x01c00000, 0x01d00000, 0x01e00000, 0x01f00000,
     0x02000000, 0x02080000, 0x02100000, 0x02180000, 0x02200000, 0x02280000, 0x02300000, 0x02380000,
     0x02400000, 0x02480000, 0x02500000, 0x02580000, 0x02600000, 0x02680000, 0x02700000, 0x02780000,
     0x02800000, 0x02840000, 0x02880000, 0x028c0000, 0x02900000, 0x02940000, 0x02980000, 0x029c0000,
     0x02a00000, 0x02a40000, 0x02a80000, 0x02ac0000, 0x02b00000, 0x02b40000, 0x02b80000, 0x02bc0000,
     0x02c00000, 0x02c40000, 0x02c80000, 0x02cc0000, 0x02d00000, 0x02d40000, 0x02d80000, 0x02dc0000,
     0x02e00000, 0x02e40000, 0x02e80000, 0x02ec0000, 0x02f00000, 0x02f40000, 0x02f80000, 0x02fc0000,
];
```
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-top: -150px; text-align: left;"></div>
<div style="text-align: left; font-size: 12px;">(Note, here we use σ = 0, and then adjust the magic numbers to produce the most accurate results over the problem domain.)</div>
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><small>Appendix B:</small> <br/> Born in Babylona</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">The Newton-Raphson Method is an iterative way of solving for roots of an equation. An approximation is improved by feeding it back into the reverse equation and averaging.</div>
@snapend

<div class="midpoint span-75 text-06">
`\[y \approx {\sqrt{x}}\]
\[y' = {y + {\frac{x}{y}} \over {2}}\]
\[\]
\[y \approx {1 \over \sqrt{x}}\]
\[y' = -{3y - {\frac{x}{y^{-3}}} \over {2}}\]`
</div>

@snap[south span-85 text-05 text-black]
<div style="margin-top: -150px; text-align: left;">Fun fact: a version of this method allowing one to find square roots by hand was known to the ancient Babylonians.</div>
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><small>Appendix D:</small> <br/> Double the Pleasure</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Let's take a look at a double-precision floating point number, where s is the sign bit, e are the 11 bits of the exponent E, and m are the 52 significant bits of the mantissa M.</div>
<div style="letter-spacing: -4px;"><span style="color: orange;">s</span> <span style="color: green;">e e e e e e e e e e e</span> <span style="color: red;">m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m</span></div>
@snapend

<div class="midpoint span-75 text-06">
`\[\]
\[{\large{I}_y} \approx {\small\frac{3}{2}} K -{\small\frac{1}{2}}{\large{I}_x}\]
\[\]
\[K = L(B - \sigma) = (2^{52}) (1023 - 0.0450465)\]
\[\]
\[K = 4606979606846918168 = 0x3fef478b29944ea8\]
\[\]
\[{\small\frac{3}{2}} K = 6910469321099104169 = 0x5fe6eb50c7b537a9\]`
</div>

@snap[south span-85 text-05 text-black]
<div style="margin-top: -150px; text-align: left;">For these 64-bit numbers the bias B is 1023, and the length L is 2^52. Using these values, we find the double-precision version of K as well as our magic number!</div>
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><small>Appendix H:</small> <br/> The Hippopotenuse</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Germane to the discussion, but without the same rigorous precision, here is a "dog-leg" approximation using bitwise disjunction for the hypotenuse of a triangle.</div>
@snapend

<div class="midpoint span-75 text-06">
`\[hypot(x, y) = \sqrt{x^2 + y^2}\]
\[\]
\[hypot(x, y) \approx \max(x, y) + \sigma \space min(x, y)\]
\[\]
\[hypot(x, y) \approx x \space | \space y\]`
</div>

@snap[south span-85 text-05 text-black]
<div style="margin-top: -150px; text-align: left;">The minimum is never less than the longest, the maximum is never more than the sum. Yielding the same range, but with significant error around powers of two.</div>
@snapend

@snap[east span-20]
@img[](hippopotenuse.jpg)
@snapend


---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/>Citations</div>
@snapend

<div class="west span-85 text-05 text-black">
<p><a href="http://h14s.p5r.org/2012/09/0x5f3759df.html" style="color: black; padding-left: 50px; font-size: 15px; display: block;" target="_blank">Hansen, Christian Plesner. “0x5f3759df”, Hummus and Magnets, 5 September 2012. http://h14s.p5r.org/2012/09/0x5f3759df.html</a>

<p><a href="http://h14s.p5r.org/2012/09/0x5f3759df-appendix.html" style="color: black; padding-left: 50px; font-size: 15px; display: block;" target="_blank">Hansen, Christian Plesner. “0x5f3759df (appendix)”, Hummus and Magnets 18 September 2012. http://h14s.p5r.org/2012/09/0x5f3759df-appendix.html</a>

<p><a href="http://www.lomont.org/papers/2003/InvSqrt.pdf" style="color: black; padding-left: 50px; font-size: 15px; display: block;" target="_blank">Lomont, Chris. “FAST INVERSE SQUARE ROOT”, Purdue
University, www.math.purdue.edu/∼ clomont, February 2003. http://www.lomont.org/papers/2003/InvSqrt.pdf</a>

<p><a href="https://cs.uwaterloo.ca/~m32rober/rsqrt.pdf" style="color: black; padding-left: 50px; font-size: 15px; display: block;" target="_blank">Robertson, Matthew. “A Brief History of InvSqrt”, University of New Brunswick, 24 April 2012. https://cs.uwaterloo.ca/~m32rober/rsqrt.pdf</a>

<p><a href="https://en.wikipedia.org/wiki/Fast_inverse_square_root" style="color: black; padding-left: 50px; font-size: 15px; display: block;" target="_blank">Wikipedia contributors. "Fast inverse square root" Wikipedia, The Free Encyclopedia, (last edited) 13 August 2019. https://en.wikipedia.org/wiki/Fast_inverse_square_root</a>

<p><a href="https://github.com/id-Software/Quake-III-Arena" style="color: black; padding-left: 50px; font-size: 15px; display: block;" target="_blank">Quake-III-Arena source code on GitHub: https://github.com/id-Software/Quake-III-Arena</a>
</div>

