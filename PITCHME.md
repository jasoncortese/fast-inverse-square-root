## Fast Inverse Square Root Algorithm 
#### (or, evil floating point bit level hacking)


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px;"><br/> Origins...</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Around the turn of the century on a Usenet public forum, someone posted this method pulled from the depths of the source code for Quake III...</div>
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-bottom: 100px; text-align: left;">This was originally credited to John Carmack who was lead programmer on the project, but can be traced back to Greg Walsh drawing inspiration from Cleve Moler while at Ardent Computers.</div>
@snapend

@snap[midpoint span-65 text-05]
```c
float Q_rsqrt( float number ) {
    float x2 = number \* 0.5F;
    float y  = number;
    long i  = \* ( long \* ) &y;                  // evil floating point bit level hacking
    i  = 0x5f3759df - ( i >> 1 );               // what the fuck? 
    y  = \* ( float \* ) &i;
    y  = y \* ( threehalfs - ( x2 \* y \* y ) );   // 1st iteration
//    y  = y \* ( threehalfs - ( x2 \* y \* y ) ); // 2nd iteration, this can be removed

    return y;
}
```
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> Math is hard, m'kay?</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">In 3D graphics you do a lot of normalizing vectors, and that involves a lot of inverses and square roots, both of which are expensive operations (back then, quadruply so).</div>
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-bottom: 100px; text-align: left;">Logarithms would simplify the calculations, which for values between 0 and 1 can be linearly approximated. Applying Newton's method would further improve the results.</div>
@snapend

@snap[midpoint span-65 text-05]
`\[y = {1 \over \sqrt{x}} = x^{-\frac{1}{2}}\]
\[\log_2 y = -{\small\frac{1}{2}} {\log_2 x}\]
\[\log_2 y \approx (x - 1) + \sigma\]
\[y \approx {\large{2}}^{(x - 1) + \sigma}\]
\[y' \approx -{{{x}{y^3} - 3y} \over {2}}\]`
@snapend

@snap[east span-30 text-05]
<div style="margin-top: 50px; margin-right: 25px;">
    @img[](ln.png)
    @img[](0.5.png)
</div>
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> IEEE</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Let's take a look at a single-precision floating point number, where s is the sign bit, e are the 8 bits of the exponent E, and m are the 23 significant bits of the mantissa M.</div><br/>
<span style="color: orange;">s</span> <span style="color: green;">e e e e e e e e</span> <span style="color: red;">m m m m m m m m m m m m m m m m m m m m m m m</span>
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-bottom: 100px; text-align: left;">For these 32-bit numbers the bias B is 127, and the length L is 2^23. Given these, it is easy to convert between the floating point number and the integer interpretation.</div>
@snapend

@snap[midpoint span-65 text-05]
`\[m = {\frac{M}{L}}\]
\[e = E - B\]
\[\]
\[{\large{F}} \rightarrow (m + 1) 2^e\]
\[\]
\[{\large{I}} \rightarrow M + L E\]`
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> IEEE-yai-yai</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Substituting our float representation into the inverse square root equation, this reduces to a formula that approximates our integer representation. </div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">Look familiar? <br/>
<center class="fragment">`i  = 0x5f3759df - ( i >> 1 );`</center></div>
@snapend


@snap[midpoint span-65 text-05]
`\[\log_2 (m_y + 1) + e_y = -{\small\frac{1}{2}} {\log_2 (m_x + 1) + e_x}\]
\[m_y + \sigma + e_y \approx -{\small\frac{1}{2}} (m_x + \sigma + e_x)\]
\[{\frac{M_y}{L}} + E_y + \sigma \approx -{\small\frac{1}{2}} ({\frac{M_x}{L}} + E_x + \sigma)\]
\[{M_y} + LE_y \approx {\small\frac{3}{2}} L(B - \sigma) -{\small\frac{1}{2}}(M_x + LE_x)\]
\[{\large{I}_y} \approx {\small\frac{3}{2}} L(B - \sigma) -{\small\frac{1}{2}}{\large{I}_x}\]`
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> The Magic Number</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">We're looking for three-halves of a constant K, from which we can subtract one-half of the integer to approximate the inverse square root of the float.</div>
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-bottom: 100px; text-align: left;">We've found our magic number! <br/>
    <span style="font-size: 12px;">(Note, we chose a value for σ = 0.0450465 which yields our magic number directly, while research has shown σ = 0.0450333 is more accurate.)</span></div>
@snapend

@snap[midpoint span-65 text-05]
`\[{\large{I}_y} \approx {\small\frac{3}{2}} K -{\small\frac{1}{2}}{\large{I}_x}\]
\[\]
\[K = L(B - \sigma) = (2^{23}) (127 - 0.0450465)\]
\[\]
\[K = 1064975338 = 0x3f7a3bea\]
\[\]
\[{\small\frac{3}{2}} K = 1597463007 = 0x5f3759df\]`
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> More Magic Numbers</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Generalizing from the inverse square root, we can find other magic numbers for: <br/> proper square root, cube root, etc.</div>
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-bottom: 100px; text-align: left;">These are fractions of our constant K, which is approximately equal to 1.<br/>
    <span style="font-size: 12px;">(Note, the float value of K = 1 - σ/2 = 0.97747675, slightly less than 1 to minimize the error in our linear approximation).</span></div>
@snapend

@snap[midpoint span-65 text-05]
`\[{\large{I}_y} \approx (1-n) K + {n}{\large{I}_x}\]
\[(1 - n) K = (1 - n) (2^{23}) (127 - \sigma)\]
\[\]
\[{\small\frac{1}{2}} K = 0x1fbd1df5\]
\[\]
\[{\small\frac{2}{3}} K = 0x2a517d3c\]
\[\]
\[K = 0x3f7a3bea\]`
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> What the f*ck?</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">We can now make sense of the original function: <i>shift right for the square root, negate for the inverse, and our magic number is simply three-halves.</i></div>
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-bottom: 100px; text-align: left;">... Apply one iteration of Newton's method, and we have a surprisingly accurate approximation for the inverse square root!</div>
@snapend

@snap[midpoint span-65 text-05]
```c
float Q_rsqrt( float number ) {
    float x2 = number \* 0.5F;
    float y  = number;
    long i  = \* ( long \* ) &y;                   // alias as integer
    i  >>= 1 ;                                   // shift right as integer
    i  \*= -1 ;                                   // negate as integer
    i  += 0x5f3759df;                            // add the magic number 
    y  = \* ( float \* ) &i;                       // alias as float
    y  = y \* ( threehalfs - ( x2 \* y \* y ) );    // apply newton's method
    return y;
}
```
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> What the ph*ck?</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">It turns out the most interesting thing here isn't the magic number itself, but that: <br/> <i>aliasing a float as an integer approximates a logarithmic operation!</i></div>
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-bottom: 100px; text-align: left;">We're going to call this, "`prosthaphaeresis`" &mdash; an old-timey term for logarithmic-like approximations before logarithms were invented &mdash; or "`phast`" for short.</div>
@snapend

@snap[midpoint span-65 text-04]
<table>
  <tr>
    <th>Integer Operation</th>
    <th>Float Operation</th>
  </tr>
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
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> Inverse Square Root</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Now let's do this with JavaScript... We create a global ArrayBuffer to hold a 32-bit number, and two views on that buffer: one as a float, and one as an unsigned integer.</i></div>
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-bottom: 100px; text-align: left;"><span style="font-size: 12px;">(Note, we commented out the Newton iteration here, and chose a value for σ = 0.0448367 which improves accuracy with that step removed.)</span></div>
@snapend

@snap[midpoint span-65 text-05]
```javascript
const buffer = new ArrayBuffer(4); // (x)
const fltb = new Float32Array(buffer);
const intb = new Uint32Array(buffer);

function invsqrt(x) {
    fltb[0] = x;                             // alias x
    intb[0] >>= 1;                           // phast square root
    intb[0] \*= -1;                           // phast inverse
    intb[0] += 0x5f376430;                   // phast three-halves
//  fltb[0] \*= 1.5 - (x \* fltb[0] \*\* 2);     // apply newtons method
    return fltb[0];                          // return x
}
```
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> Square Root</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Square root. Here, instead of an iteration of Newton's method, we've created a secondary function to which we pass the original number and the first-order approximation.</i></div>
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-bottom: 100px; text-align: left;">Note, the different magic number we use in the second-order method, a result of doing fast division here rather than fast root extraction.</div>
@snapend

@snap[midpoint span-65 text-05]
```javascript
function sqrt(x) {
    fltb[0] = x;                             // alias x
    intb[0] >>= 1;                           // phast square root
    intb[0] += 0x1fbd2165;                   // phast fraction 1/2
    return fltb[0];                          // return x'
}

function sqrtN(x, y) {
    fltb[0] = y;                             // alias y
    intb[0] \*= -1;                           // phast inverse
    fltb[0] \*= x;                            // times x
    fltb[0] += y;                            // plus y
    intb[0] -= 0x00886e54;                   // phast integer 2
    return fltb[0];                          // return x'
}
```
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> More Roots</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Here are first order approximations for cube root, fourth root, and nth root functions.</i></div>
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-bottom: 100px; text-align: left;">For the nth root we have the added step of finding the fraction (1-p) from a passed in integer.</div>
@snapend

@snap[midpoint span-65 text-05]
```javascript
function cbrt(x) {
    fltb[0] = x;                             // alias x
    intb[0] /= 3;                            // phast cube root
    intb[0] += 0x2a5181dc;                   // phast fraction 2/3
    return fltb[0];                          // return x'
}

function frthrt(x) {
    fltb[0] = x;                             // alias x
    intb[0] >>= 2;                           // phast fourth root
    intb[0] += 0x2f9bb218;                   // phast fraction 3/4
    return fltb[0];                          // return x'
}

function nthrt(n, x) {
    fltb[0] = x;                             // alias x
    intb[0] /= n;                            // phast nth root
    intb[0] += (n - 1) / n * 0x3f7a3bea;     // phast fraction (1-p)
    return fltb[0];                          // return x'
}
```
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> Taylor Series</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Root functions are not the only ones we can approximate linearly with these prosthaphaeretic operations. Any Taylor series expansion should work well...</div>
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-bottom: 100px; text-align: left;">Exponential and trigonometric functions in particular are worth looking at due to their prominence in video compression.</div>
@snapend

@snap[midpoint span-65 text-05]
`\[{e^{x}} \approx {\frac{1}{0!}} + {\frac{x}{1!}} + {\frac{x^2}{2!}} + {\frac{x^3}{3!}} + \dots\]
\[{\log_e{(1+x)}} \approx {x} - {\frac{x^2}{2}} + {\frac{x^3}{3}} - {\frac{x^4}{4}} + \dots\]
\[{\sin{x}} \approx {x} - {\frac{x^3}{3!}} + {\frac{x^5}{5!}} - {\frac{x^7}{7!}} + \dots\]
\[{\cos{x}} \approx {x} - {1} - {\frac{x^2}{2!}} + {\frac{x^4}{4!}} - {\frac{x^6}{6!}} + \dots\]
\[{\tan{x}} \approx {x} + {\frac{x^3}{3}} + {\frac{2x^5}{15}} - {\frac{3x^7}{105}} + \dots\]`
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> Exponents</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">First order approximations for reciprocal, exponent and logarithm functions.</div>
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-bottom: 100px; text-align: left;"></div>
@snapend

@snap[midpoint span-65 text-05]
```javascript
function rcpr(x) {
    fltb[0] = x;                             // alias x
    intb[0] \*= -1;                           // phast invert
    intb[0] -= 0x80000000;                   // phast fraction 1/1
    return x;                                // return x
}

function exp(x) {
    fltb[0] = x;                             // alias x
    intb[0] <<= 1;                           // phast square
    intb[0] -= 0x3ff4d2bc;                   // phast fraction 4/3
    return 1 + x + fltb[0];                  // return 1 + x + ½ x²
}

function log(x) {
    fltb[0] = x - 1;                         // alias x
    intb[0] <<= 1;                           // phast square
    intb[0] -= 0x3ff4d2bc;                   // phast fraction 4/3
    return x - fltb[0];                      // return x - ½ x²
}
```
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> Trigonometry</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">First order approximations for cosine, sine, and tangent functions.</div>
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-bottom: 100px; text-align: left;"></div>
@snapend

@snap[midpoint span-65 text-05]
```javascript
function cos(x) {
    fltb[0] = x;                             // alias x
    intb[0] <<= 1;                           // phast square
    intb[0] -= 0x3ff4d2bc;                   // phast fraction 4/3
    return 1 - fltb[0];                      // return 1 - ½ x²
}

function sin(x) {
    fltb[0] = x;                             // alias x
    intb[0] /= 3;                            // phast cube root
    intb[0] -= 0x40f1c87a;                   // phast fraction 6/5
    return x - fltb[0];                      // return x - ⅙ x³
}

function tan(x) {
    const sinx = sin(x), cosx = cos(x);
    fltb[0] = cosx;                          // alias cosx
    intb[0] \*= 1;                            // phast inverse
    intb[0] += 0x00000000;                   // phast integer 1
    fltb[0] \*= sinx;                         // times sinx
    return fltb[0];                          // return tanx
}
```
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/> More Trig Functions</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">First order approximations for arc-cosine, double-angle cosine, cosine squared functions.</div>
@snapend

@snap[south span-85 text-05 text-black fragment]
<div style="margin-bottom: 100px; text-align: left;"></div>
@snapend

@snap[midpoint span-65 text-05]
```javascript
function arc_cos(x) {
    fltb[0] = 1 - x;                         // alias 1 - x
    intb[0] += 0x3ff4d2bc;                   // phast fraction 4/3
    intb[0] >>= 1;                           // phast square root
    return 1 - fltb[0];                      // return √(2 - 2x)
}

function cos_dbl(x) {
    const cosx = cos(x);
    fltb[0] = cosx;                          // alias cosx
    intb[0] <<= 1;                           // phast square
    intb[0] += 0x00800000;                   // phast integer 2
    return fltb[0] - 1;                      // return 2 cos²(x) - 1
}

function cos_sqd(x) {
    const cos2x = cos(2 * x);
    fltb[0] = 1 + cos2x;                     // alias 1 + cos2x
    intb[0] -= 0x00800000;                   // phast integer -2
    return fltb[0];                          // return ½ (1 + cos(2x))
}
```
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/>Conclusion...</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Nowadays the native instruction is generally faster than the original algorithm. But what if a floating point format existed that directly accounted for the linear approximation?</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">We'll leave off here with a hypothetical implementation of cosine, performing its own second and third-order iterations. Enjoy.</div>
@snapend

@snap[midpoint span-65 text-05]
```javascript
function future_cos(x) {
    fltb[0] = x;                             // alias x
    intb[0] -= 1 << 23;                      // phast in 2^m
    intb[0] <<= 1;                           // phast square
    intb[0] -= 2;                            // phast divide-by 1 \* 2
    fltb[4] = fltb[0];                       // alias x'
    intb[4] <<= 1;                           // phast square
    intb[4] -= 12;                           // phast divide-by 3 \* 4
    fltb[8] = fltb[4];                       // alias x"
    intb[8] <<= 1;                           // phast square
    intb[8] -= 30;                           // phast divide-by 5 \* 6
    intb[8] += 1 << 23;                      // phast out 2^m
    intb[4] += 1 << 23;                      // phast out 2^m
    intb[0] += 1 << 23;                      // phast out 2^m
    return 1 - fltb[0] + fltb[4] - fltb[8];  // return 1 - ½ x² (1 - ⅓¼ x² (1 - ⅕⅙ x²))
    return 1 - fltb[0] + fltb[4] - fltb[8];  // return 1 - ½ x² (1 - ⅓¼ x² (1 - ⅕⅙ x²))
```
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><small>Appendix A:</small> <br/> All the Magic Numbers</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Fractional values for use during phast power/root extraction, and integral values for use during phast multiplication/division.</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">
    <span style="font-size: 12px;">(Note, here we use σ = 0, and then adjust the magic numbers to produce the most accurate results over the problem domain.)</span></div>
@snapend

@snap[midpoint span-65 text-05]
```
const phastFractions = [
    [0x7FF00000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000],
    [0x7F800000, 0x3F800000, 0x1FC00000, 0x152AAAAB, 0x0FE00000, 0x0CB33333, 0x0A955555, 0x09124925],
    [0x7F800000, 0x7F000000, 0x3F800000, 0x2A555555, 0x1FC00000, 0x19666666, 0x152AAAAB, 0x12249249],
    [0x7F800000, 0x7F100000, 0x5F400000, 0x3F800000, 0x2FA00000, 0x2619999A, 0x1FC00000, 0x1B36DB6E],
    [0x7F800000, 0x7F100000, 0x7F000000, 0x54AAAAAB, 0x3F800000, 0x32CCCCCD, 0x2A555555, 0x24492492],
    [0x7F800000, 0x7F200000, 0x7F100000, 0x69D55555, 0x4F600000, 0x3F800000, 0x34EAAAAB, 0x2D5B6DB7],
    [0x7F800000, 0x7F200000, 0x7F100000, 0x7F000000, 0x5F400000, 0x4C333333, 0x3F800000, 0x366DB6DB],
    [0x7F800000, 0x7F200000, 0x7F100000, 0x7F100000, 0x6F200000, 0x58E66666, 0x4A155555, 0x3F800000],
];

const phastIntegers = [
    0xC0800000, 0x00000000, 0x00800000, 0x00C00000, 0x01000000, 0x01200000, 0x01400000, 0x01600000,
    0x01800000, 0x01900000, 0x01A00000, 0x01B00000, 0x01C00000, 0x01D00000, 0x01E00000, 0x01F00000,
    0x02000000, 0x02080000, 0x02100000, 0x02180000, 0x02200000, 0x02280000, 0x02300000, 0x02380000,
    0x02400000, 0x02480000, 0x02500000, 0x02580000, 0x02600000, 0x02680000, 0x02700000, 0x02780000,
    0x02800000, 0x02840000, 0x02880000, 0x028C0000, 0x02900000, 0x02940000, 0x02980000, 0x029C0000,
    0x02A00000, 0x02A40000, 0x02A80000, 0x02AC0000, 0x02B00000, 0x02B40000, 0x02B80000, 0x02BC0000,
    0x02C00000, 0x02C40000, 0x02C80000, 0x02CC0000, 0x02D00000, 0x02D40000, 0x02D80000, 0x02DC0000,
    0x02E00000, 0x02E40000, 0x02E80000, 0x02EC0000, 0x02F00000, 0x02F40000, 0x02F80000, 0x02FC0000,
];
```
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><small>Appendix B:</small> <br/> Born in Babylona</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">The Newton-Raphson Method is an iterative way of solving for roots of an equation. An approximation is improved by feeding it back into the reverse equation and averaging.</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">Fun fact: a version of this method allowing one to find square roots by hand was known to the ancient Babylonians.</div>
@snapend

@snap[midpoint span-65 text-05]
`\[y \approx {\sqrt{x}}\]
\[y' = {{\frac{x}{y} + y} \over {2}}\]
\[\]
\[y \approx {1 \over \sqrt{x}}\]
\[y' = -{{\frac{x}{y^{-3}} - 3y} \over {2}}\]`
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><small>Appendix D:</small> <br/> Double the Pleasure</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Let's take a look at a double-precision floating point number, where s is the sign bit, e are the 11 bits of the exponent E, and m are the 52 significant bits of the mantissa M.</div><br/>
<span style="letter-spacing: -4px;"><span style="color: orange;">s</span> <span style="color: green;">e e e e e e e e e e e</span> <span style="color: red;">m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m m</span></span>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">For these 64-bit numbers the bias B is 1023, and the length L is 2^52. Using these values, we find the double-precision version of K as well as our magic number!</div>
@snapend

@snap[midpoint span-65 text-05]
`\[\]
\[{\large{I}_y} \approx {\small\frac{3}{2}} K -{\small\frac{1}{2}}{\large{I}_x}\]
\[\]
\[K = L(B - \sigma) = (2^{52}) (1023 - 0.0450465)\]
\[\]
\[K = 4606979606846918168 = 0x3fef478b29944ea8\]
\[\]
\[{\small\frac{3}{2}} K = 6910469321099104169 = 0x5fe6eb50c7b537a9\]`
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><small>Appendix H:</small> <br/> The Hippopotenuse</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Germane to the discussion thus far, but without the same rigorous precision, here is a "dog-leg" approximation using bitwise disjunction for the hypotenuse of a triangle.</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">The minimum is never less than the longest, the maximum is never more than the sum. Yielding the same range, but with significant error around powers of two.</div>
@snapend

@snap[midpoint span-65 text-05]
`\[hypot(x, y) = \sqrt{x^2 + y^2}\]
\[\]
\[hypot(x, y) \approx \max(x, y) + \sigma \space min(x, y)\]
\[\]
\[hypot(x, y) \approx x \space | \space y\]`
@snapend

@snap[east span-30 text-05]
<div style="margin-top: 25px; margin-right: 25px;">@img[](hippopontenuse.png)</div>
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;"><br/>Citations</div>
@snapend

@snap[west span-85 text-05 text-black]
<p><a href="http://h14s.p5r.org/2012/09/0x5f3759df.html" style="color: black; padding-left: 50px; font-size: 15px; display: block;" target="_blank">Hansen, Christian Plesner. “0x5f3759df”, Hummus and Magnets, 5 September 2012. http://h14s.p5r.org/2012/09/0x5f3759df.html</a>

<p><a href="http://h14s.p5r.org/2012/09/0x5f3759df-appendix.html" style="color: black; padding-left: 50px; font-size: 15px; display: block;" target="_blank">Hansen, Christian Plesner. “0x5f3759df (appendix)”, Hummus and Magnets 18 September 2012. http://h14s.p5r.org/2012/09/0x5f3759df-appendix.html</a>

<p><a href="http://www.lomont.org/papers/2003/InvSqrt.pdf" style="color: black; padding-left: 50px; font-size: 15px; display: block;" target="_blank">Lomont, Chris. “FAST INVERSE SQUARE ROOT”, Purdue
University, www.math.purdue.edu/∼ clomont, February 2003. http://www.lomont.org/papers/2003/InvSqrt.pdf</a>

<p><a href="https://cs.uwaterloo.ca/~m32rober/rsqrt.pdf" style="color: black; padding-left: 50px; font-size: 15px; display: block;" target="_blank">Robertson, Matthew. “A Brief History of InvSqrt”, University of New Brunswick, 24 April 2012. https://cs.uwaterloo.ca/~m32rober/rsqrt.pdf</a>

<p><a href="https://en.wikipedia.org/wiki/Fast_inverse_square_root" style="color: black; padding-left: 50px; font-size: 15px; display: block;" target="_blank">Wikipedia contributors. "Fast inverse square root" Wikipedia, The Free Encyclopedia, (last edited) 13 August 2019. https://en.wikipedia.org/wiki/Fast_inverse_square_root</a>

<p><a href="https://github.com/id-Software/Quake-III-Arena" style="color: black; padding-left: 50px; font-size: 15px; display: block;" target="_blank">Quake-III-Arena source code on GitHub: https://github.com/id-Software/Quake-III-Arena</a>
@snapend

