## Fast Inverse Square Root Algorithm 
#### (or, evil floating point bit level hacking)


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px;">Origins...</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Around the turn of the century on a Usenet public forum, someone posted this method pulled from the depths of the source code to Quake III Arena...</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">This was credited to John Carmack who was lead programmer on the Quake software, but can be traced back to the mid-80s with Greg Walsh and Cleve Moler working at Ardent Computers.</div>
@snapend

@snap[midpoint span-60 text-05]
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
#### <div style="padding-left: 20px; color: white;">Math is hard, m'kay?</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">In 3D graphics you do a lot of normalizing vectors, and that involves a lot of inverses and square roots, both of which are expensive operations (back then, quadruply so).</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">Logarithms would simplify the calculations, which for values between 0 and 1 can be linearly approximated. Applying Newton's method would further improve the results.</div>
@snapend

@snap[midpoint span-60 text-05]
`\[y = {1 \over \sqrt{x}} = x^{-\frac{1}{2}}\]
\[\log_2 y = -{\small\frac{1}{2}} {\log_2 x}\]
\[\log_2 y \approx (x - 1) + \sigma\]
\[y \approx {\large{2}}^{(x - 1) + \sigma}\]
\[y' \approx -{{{x}{y^3} - 3y} \over {2}}\]`
@snapend

@snap[east span-30 text-05]
<div style="margin-top: 25px; margin-right: 25px;">@img[fragment](ln.png)</div>
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;">IEEE-yai-yai</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Let's take a look at a single-precision floating point number, where s is the sign bit, e are the 8 bits of the exponent E, and m are the 23 significant bits of the mantissa M.</div><br/>
<span style="color: orange;">s</span> <span style="color: green;">e e e e e e e e</span> <span style="color: red;">m m m m m m m m m m m m m m m m m m m m m m m</span>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">For these 32-bit numbers the bias B is 127, and the length L is 2^23. Given these, it is easy to convert between the floating point number and the integer interpretation.</div>
@snapend

@snap[midpoint span-60 text-05]
`\[m = {\frac{M}{L}}\]
\[e = E - B\]
\[\]
\[{\large{F}} \rightarrow (m + 1) 2^e\]
\[\]
\[{\large{I}} \rightarrow M + L E\]`
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;">IEEE-yai-yai</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Substituting our float representation into the inverse square root equation, this reduces to a formula that approximates our integer representation. </div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">Look familiar? <br/>
<center class="fragment">`i  = 0x5f3759df - ( i >> 1 );`</center></div>
@snapend


@snap[midpoint span-60 text-05]
`\[\log_2 (m_y + 1) + e_y = -{\small\frac{1}{2}} {\log_2 (m_x + 1) + e_x}\]
\[m_y + \sigma + e_y \approx -{\small\frac{1}{2}} (m_x + \sigma + e_x)\]
\[{\frac{M_y}{L}} + E_y + \sigma \approx -{\small\frac{1}{2}} ({\frac{M_x}{L}} + E_x + \sigma)\]
\[{M_y} + LE_y \approx {\small\frac{3}{2}} L(B - \sigma) -{\small\frac{1}{2}}(M_x + LE_x)\]
\[{\large{I}_y} \approx {\small\frac{3}{2}} L(B - \sigma) -{\small\frac{1}{2}}{\large{I}_x}\]`
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;">The Magic Number</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">We're looking for three-halves of a constant K, from which we can subtract one-half of the integer to approximate the inverse square root of the float.</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">And we've found our magic number! <br/>
    <span style="font-size: 12px;">(Note that we chose a value for σ = 0.0450465 which yields our magic number directly, while research has shown σ = 0.0450333 is more accurate.)</span></div>
@snapend

@snap[midpoint span-60 text-05]
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
#### <div style="padding-left: 20px; color: white;">More Magic Numbers</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Generalizing from the inverse square root, we can find other magic numbers for: <br/> proper square root, cube root, etc.</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">The constant K as a float is "almost one", slightly less to help account for the error in our linear approximation.</div>
@snapend

@snap[midpoint span-60 text-05]
`\[{\large{I}_y} \approx (1-n) K + {n}{\large{I}_x}\]
\[(1 - n) K = (1 - n) (2^{23}) (127 - \sigma)\]
\[{\small\frac{1}{2}} K = 0x1fbd1df5\]
\[{\small\frac{2}{3}} K = 0x2a517d3c\]
\[K = 0x3f7a3bea\]
\[\]
\[{\large{F}}_K = 1 - {\frac{\sigma}{2}} = 0.97747675\]`
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;">Prosthaphaeresis</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">It turns out the most interesting thing here isn't the magic number itself, but the idea: <i>aliasing a float as an integer approximates a logarithmic operation!</i></div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">We're going to call these operations "`prosthaphaeretic`", an old-timey term for logarithmic-like approximations before logarithms were invented.</div>
@snapend

@snap[midpoint span-60 text-04]
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
#### <div style="padding-left: 20px;">What the f*ck?</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">We can now make sense of our function: <i>shifting right for the square root, negating for the inverse, and our magic number is simply three-halves.</i></div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">... Apply one iteration of Newton's method, and we have a surprisingly accurate approximation of the inverse square root!</div>
@snapend

@snap[midpoint span-60 text-05]
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
#### <div style="padding-left: 20px;">Inverse Square Root</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Let's convert this to JavaScript... We create a global ArrayBuffer to hold a 32-bit number, and two views on that buffer: one as a float, and one as an unsigned integer.</i></div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;"><span style="font-size: 12px;">(Note that we commented out the Newton iteration here, and chose a value for σ = 0.0448367 which performs slightly better with that removed.)</span></div>
@snapend

@snap[midpoint span-60 text-05]
```javascript
const buffer = new ArrayBuffer(4); // (x)
const fltb = new Float32Array(buffer);
const intb = new Uint32Array(buffer);

function invsqrt(x) {
    fltb[0] = x;                             // alias x
    intb[0] >>= 1;                           // p-etic square root
    intb[0] \*= -1;                           // p-etic inverse
    intb[0] += 0x5f376430;                   // p-etic three-halves
//    fltb[0] \*= 1.5 - (x \* fltb[0] \*\* 2);     // apply newtons method
    return fltb[0];                          // return x
}
```
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px;">Square Root</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Square root. Here, instead of an iteration of Newton's method, we've created a secondary function to which we pass the original number and the first-order approximation.</i></div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">Note, the different magic number we use in the second-order method, a result of doing fast division here rather than fast root extraction.</div>
@snapend

@snap[midpoint span-60 text-05]
```javascript
function sqrt(x) {
    fltb[0] = x;                             // alias x
    intb[0] >>= 1;                           // p-etic square root
    intb[0] += 0x1fbd2165;                   // p-etic fraction 1/2
    return fltb[0];                          // return x
}

function sqrtN(x, y) {
    fltb[0] = y;                             // alias y
    intb[0] \*= -1;                           // p-etic inverse
    fltb[0] \*= x;                            // times x
    fltb[0] += y;                            // plus y
    intb[0] -= 0x00886e54;                   // p-etic integer 2
    return fltb[0];                          // return x
}
```
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px;">Cube Root</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Cube root. Here, instead of an iteration of Newton's method, we've created a secondary function to which we pass the original number and the first-order approximation.</i></div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">Note, the different magic number we use in the second-order method, a result of doing fast division here rather than fast root extraction.</div>
@snapend

@snap[midpoint span-60 text-05]
```javascript
function cbrt(x) {
    fltb[0] = x;                             // alias x
    intb[0] /= 3;                            // p-etic cube root
    intb[0] += 0x2a5181dc;                   // p-etic fraction 2/3
    return fltb[0];                          // return x
}

function frthrt(x) {
    fltb[0] = x;                             // alias x
    intb[0] >>= 2;                           // p-etic fourth root
    intb[0] += 0x2f9bb218;                   // p-etic fraction 3/4
    return fltb[0];                          // return x
}

function nthrt(n, x) {
    fltb[0] = x;                             // alias x
    intb[0] /= n;                            // p-etic nth root
    intb[0] += (1 - n) \* 0x3f7a42ca;         // p-etic almost one
    return fltb[0];                          // return x
}
```
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px;">All the Magic Numbers</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Integer values for use during fast multiplication/division with p-etic operations. Fractional values for use during fast power/root extraction with p-etic operations.</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">Note, we are using the base version of K here, with sigma equals zero.</div>
@snapend

@snap[midpoint span-60 text-05]
```const peticIntegers = [
            0xC0800000, 0x00000000, 0x00800000, 0x00C00000, 0x01000000, 0x01200000, 0x01400000, 0x01600000,
            0x01800000, 0x01900000, 0x01A00000, 0x01B00000, 0x01C00000, 0x01D00000, 0x01E00000, 0x01F00000,
            0x02000000, 0x02080000, 0x02100000, 0x02180000, 0x02200000, 0x02280000, 0x02300000, 0x02380000,
            0x02400000, 0x02480000, 0x02500000, 0x02580000, 0x02600000, 0x02680000, 0x02700000, 0x02780000,
            0x02800000, 0x02840000, 0x02880000, 0x028C0000, 0x02900000, 0x02940000, 0x02980000, 0x029C0000,
            0x02A00000, 0x02A40000, 0x02A80000, 0x02AC0000, 0x02B00000, 0x02B40000, 0x02B80000, 0x02BC0000,
            0x02C00000, 0x02C40000, 0x02C80000, 0x02CC0000, 0x02D00000, 0x02D40000, 0x02D80000, 0x02DC0000,
            0x02E00000, 0x02E40000, 0x02E80000, 0x02EC0000, 0x02F00000, 0x02F40000, 0x02F80000, 0x02FC0000,
    ];
    const peticFractions = [
            [0x7FF00000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000],
            [0x7F800000, 0x3F800000, 0x1FC00000, 0x152AAAAB, 0x0FE00000, 0x0CB33333, 0x0A955555, 0x09124925],
            [0x7F800000, 0x7F000000, 0x3F800000, 0x2A555555, 0x1FC00000, 0x19666666, 0x152AAAAB, 0x12249249],
            [0x7F800000, 0x7F100000, 0x5F400000, 0x3F800000, 0x2FA00000, 0x2619999A, 0x1FC00000, 0x1B36DB6E],
            [0x7F800000, 0x7F100000, 0x7F000000, 0x54AAAAAB, 0x3F800000, 0x32CCCCCD, 0x2A555555, 0x24492492],
            [0x7F800000, 0x7F200000, 0x7F100000, 0x69D55555, 0x4F600000, 0x3F800000, 0x34EAAAAB, 0x2D5B6DB7],
            [0x7F800000, 0x7F200000, 0x7F100000, 0x7F000000, 0x5F400000, 0x4C333333, 0x3F800000, 0x366DB6DB],
            [0x7F800000, 0x7F200000, 0x7F100000, 0x7F100000, 0x6F200000, 0x58E66666, 0x4A155555, 0x3F800000],

    ];
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px;">Double Trouble</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">64-bit precision...</i></div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;"></div>
@snapend

@snap[midpoint span-60 text-05]
`\[{\large{I}_y} \approx {\small\frac{3}{2}} K -{\small\frac{1}{2}}{\large{I}_x}\]
\[\]
\[K = L(B - \sigma) = (2^{52}) (1023 - 0.0450465)\]
\[\]
\[K = 4606979606846918000 = 0x3fef478b29944e00\]
\[\]
\[{\small\frac{3}{2}} K = 6910469321099104000 = 0x5FE6EB50C7B537A9\]`
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;">Born in Babylona</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Recall that Newton's Method is an iterative way of solving for roots of a function. Starting with an approximation, then a better approximation is found by feeding the approximation into the reverse equation and averaging the results.</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">(Fun fact: this method applied to finding square roots was known to the ancient Babylonians.)</div>
@snapend

@snap[midpoint span-60 text-05]
`\[y \approx {\sqrt{x}}\]
\[y' = {{\frac{x}{y} + y} \over {2}}\]
\[\]
\[y \approx {1 \over \sqrt{x}}\]
\[y' = -{{\frac{x}{y^{-3}} - 3y} \over {2}}\]`
@snapend

