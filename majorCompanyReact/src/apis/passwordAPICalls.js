export function sameRegexp(value1) {

    const regexp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/m);
    if(!regexp.test(value1)) return 0
    else return 1;

};

export function sameCheck(value1, value2) {

    if(value1 === value2) return 1
    else return 0;

};


export function Right1() {return (<p>비밀번호 조건에 만족합니다.</p>)};
    
export function False1() {return (<p>8자 이상의 영어 대소문자, 숫자를 사용해주세요.</p>)};

export function Right2() {return (<p>비밀번호가 일치합니다.</p>)};

export function False2() {return (<p>비밀번호가 일치하지 않습니다.</p>)};