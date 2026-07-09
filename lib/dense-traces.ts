// CodeScope X — Dense Line-by-Line Step Traces
import { ExecutionStep, StackFrame, Variable, HeapBlock, StepType } from './execution-engine';

const vr = (id:string, name:string, type:any, value:any, address:string, size:number, opts:any={}): Variable =>
  ({ id, name, type, value, address, size, scope:'', isNew:false, isMutated:false, ...opts });

const fr = (id:string, fn:string, retAddr:string, line:number, depth:number, vars:Variable[], active=true, retVal?:any): StackFrame =>
  ({ id, functionName:fn, returnAddress:retAddr, variables:vars, line, isActive:active, depth, returnValue:retVal });

const st = (id:string, line:number, code:string, type:StepType, hl:ExecutionStep['highlight'],
  stack:StackFrame[], heap:HeapBlock[], output:string[], explanation:string, explanationBeginner:string,
  ops:number, changedVars:string[]=[], newVars:string[]=[]):ExecutionStep =>
  ({ id, line, code, stepType:type, highlight:hl, stack, heap, output, explanation, explanationBeginner, operationCount:ops, changedVars, newVars });

// ─── FOR LOOP (26 steps) ───────────────────────────────────────────────────
export const FOR_LOOP_CODE = `#include <iostream>
using namespace std;

int main() {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        sum = sum + i;
        cout << "i=" << i << " sum=" << sum << endl;
    }
    cout << "Final: " << sum << endl;
    return 0;
}`;

const M = (vars:Variable[], line:number, active=true) =>
  fr('main','main','0x0000',line,0,vars,active);

export const FOR_LOOP_STEPS: ExecutionStep[] = [
  st('fl0',4,'int main() {','function_call','blue',[M([],4)],[],[],
    'main() is called — program execution begins here','Program starts! main() is the entry point.',1),

  st('fl1',5,'int sum = 0;','declaration','green',
    [M([vr('sum','sum','int',0,'0x100',4,{scope:'main',isNew:true})],5)],[],[],
    'sum declared on stack at 0x100, initialized to 0','sum is created in memory and set to 0.',2,[],['sum']),

  st('fl2',6,'for (int i = 1; ...)','declaration','blue',
    [M([vr('sum','sum','int',0,'0x100',4,{scope:'main'}),vr('i','i','int',1,'0x104',4,{scope:'main',isNew:true})],6)],[],[],
    'Loop init: i declared and set to 1','Loop starts! i is created and set to 1.',3,[],['i']),

  st('fl3',6,'i <= 5  →  1 <= 5  →  true','comparison','yellow',
    [M([vr('sum','sum','int',0,'0x100',4,{scope:'main'}),vr('i','i','int',1,'0x104',4,{scope:'main'})],6)],[],[],
    'Condition check: 1 ≤ 5 → true. Entering loop body.','1 ≤ 5 is true — go inside the loop!',4),

  st('fl4',7,'sum = sum + i  →  0 + 1 = 1','assignment','green',
    [M([vr('sum','sum','int',1,'0x100',4,{scope:'main',isMutated:true}),vr('i','i','int',1,'0x104',4,{scope:'main'})],7)],[],[],
    'sum = 0 + 1 = 1. sum updated in memory.','sum gets i added: 0+1=1',5,['sum']),

  st('fl5',8,'cout << "i=1 sum=1"','output','green',
    [M([vr('sum','sum','int',1,'0x100',4,{scope:'main'}),vr('i','i','int',1,'0x104',4,{scope:'main'})],8)],[],
    ['i=1 sum=1'],
    'Line 8 outputs "i=1 sum=1" to stdout','Printing i=1 sum=1!',6),

  st('fl6',6,'i++  →  i = 2','assignment','blue',
    [M([vr('sum','sum','int',1,'0x100',4,{scope:'main'}),vr('i','i','int',2,'0x104',4,{scope:'main',isMutated:true})],6)],[],
    ['i=1 sum=1'],'i incremented: i = 2','i goes up by 1.',7,['i']),

  st('fl7',6,'i <= 5  →  2 <= 5  →  true','comparison','yellow',
    [M([vr('sum','sum','int',1,'0x100',4,{scope:'main'}),vr('i','i','int',2,'0x104',4,{scope:'main'})],6)],[],
    ['i=1 sum=1'],'Condition: 2 ≤ 5 → true. Loop continues.','2 ≤ 5 — keep looping!',8),

  st('fl8',7,'sum = 1 + 2 = 3','assignment','green',
    [M([vr('sum','sum','int',3,'0x100',4,{scope:'main',isMutated:true}),vr('i','i','int',2,'0x104',4,{scope:'main'})],7)],[],
    ['i=1 sum=1'],'sum = 1 + 2 = 3','sum is now 3!',9,['sum']),

  st('fl9',8,'cout << "i=2 sum=3"','output','green',
    [M([vr('sum','sum','int',3,'0x100',4,{scope:'main'}),vr('i','i','int',2,'0x104',4,{scope:'main'})],8)],[],
    ['i=1 sum=1','i=2 sum=3'],'Output: i=2 sum=3','Printing i=2 sum=3!',10),

  st('fl10',6,'i++  →  i = 3','assignment','blue',
    [M([vr('sum','sum','int',3,'0x100',4,{scope:'main'}),vr('i','i','int',3,'0x104',4,{scope:'main',isMutated:true})],6)],[],
    ['i=1 sum=1','i=2 sum=3'],'i = 3','i becomes 3.',11,['i']),

  st('fl11',6,'i <= 5  →  3 <= 5  →  true','comparison','yellow',
    [M([vr('sum','sum','int',3,'0x100',4,{scope:'main'}),vr('i','i','int',3,'0x104',4,{scope:'main'})],6)],[],
    ['i=1 sum=1','i=2 sum=3'],'Condition: 3 ≤ 5 → true.','3 ≤ 5, still looping!',12),

  st('fl12',7,'sum = 3 + 3 = 6','assignment','green',
    [M([vr('sum','sum','int',6,'0x100',4,{scope:'main',isMutated:true}),vr('i','i','int',3,'0x104',4,{scope:'main'})],7)],[],
    ['i=1 sum=1','i=2 sum=3'],'sum = 3 + 3 = 6','sum is now 6!',13,['sum']),

  st('fl13',8,'cout << "i=3 sum=6"','output','green',
    [M([vr('sum','sum','int',6,'0x100',4,{scope:'main'}),vr('i','i','int',3,'0x104',4,{scope:'main'})],8)],[],
    ['i=1 sum=1','i=2 sum=3','i=3 sum=6'],'Output: i=3 sum=6','Printing i=3 sum=6!',14),

  st('fl14',6,'i++  →  i = 4','assignment','blue',
    [M([vr('sum','sum','int',6,'0x100',4,{scope:'main'}),vr('i','i','int',4,'0x104',4,{scope:'main',isMutated:true})],6)],[],
    ['i=1 sum=1','i=2 sum=3','i=3 sum=6'],'i = 4','i becomes 4.',15,['i']),

  st('fl15',6,'i <= 5  →  4 <= 5  →  true','comparison','yellow',
    [M([vr('sum','sum','int',6,'0x100',4,{scope:'main'}),vr('i','i','int',4,'0x104',4,{scope:'main'})],6)],[],
    ['i=1 sum=1','i=2 sum=3','i=3 sum=6'],'Condition: 4 ≤ 5 → true.','One more iteration!',16),

  st('fl16',7,'sum = 6 + 4 = 10','assignment','green',
    [M([vr('sum','sum','int',10,'0x100',4,{scope:'main',isMutated:true}),vr('i','i','int',4,'0x104',4,{scope:'main'})],7)],[],
    ['i=1 sum=1','i=2 sum=3','i=3 sum=6'],'sum = 6 + 4 = 10','sum is now 10!',17,['sum']),

  st('fl17',8,'cout << "i=4 sum=10"','output','green',
    [M([vr('sum','sum','int',10,'0x100',4,{scope:'main'}),vr('i','i','int',4,'0x104',4,{scope:'main'})],8)],[],
    ['i=1 sum=1','i=2 sum=3','i=3 sum=6','i=4 sum=10'],'Output: i=4 sum=10','Printing i=4 sum=10!',18),

  st('fl18',6,'i++  →  i = 5','assignment','blue',
    [M([vr('sum','sum','int',10,'0x100',4,{scope:'main'}),vr('i','i','int',5,'0x104',4,{scope:'main',isMutated:true})],6)],[],
    ['i=1 sum=1','i=2 sum=3','i=3 sum=6','i=4 sum=10'],'i = 5','i becomes 5.',19,['i']),

  st('fl19',6,'i <= 5  →  5 <= 5  →  true','comparison','yellow',
    [M([vr('sum','sum','int',10,'0x100',4,{scope:'main'}),vr('i','i','int',5,'0x104',4,{scope:'main'})],6)],[],
    ['i=1 sum=1','i=2 sum=3','i=3 sum=6','i=4 sum=10'],'Condition: 5 ≤ 5 → true. Last loop!','5 ≤ 5 — final iteration!',20),

  st('fl20',7,'sum = 10 + 5 = 15','assignment','green',
    [M([vr('sum','sum','int',15,'0x100',4,{scope:'main',isMutated:true}),vr('i','i','int',5,'0x104',4,{scope:'main'})],7)],[],
    ['i=1 sum=1','i=2 sum=3','i=3 sum=6','i=4 sum=10'],'sum = 10 + 5 = 15 (1+2+3+4+5)','sum = 15!',21,['sum']),

  st('fl21',8,'cout << "i=5 sum=15"','output','green',
    [M([vr('sum','sum','int',15,'0x100',4,{scope:'main'}),vr('i','i','int',5,'0x104',4,{scope:'main'})],8)],[],
    ['i=1 sum=1','i=2 sum=3','i=3 sum=6','i=4 sum=10','i=5 sum=15'],'Output: i=5 sum=15','Printing i=5 sum=15!',22),

  st('fl22',6,'i++  →  i = 6','assignment','blue',
    [M([vr('sum','sum','int',15,'0x100',4,{scope:'main'}),vr('i','i','int',6,'0x104',4,{scope:'main',isMutated:true})],6)],[],
    ['i=1 sum=1','i=2 sum=3','i=3 sum=6','i=4 sum=10','i=5 sum=15'],'i = 6','i becomes 6.',23,['i']),

  st('fl23',6,'i <= 5  →  6 <= 5  →  false','comparison','red',
    [M([vr('sum','sum','int',15,'0x100',4,{scope:'main'}),vr('i','i','int',6,'0x104',4,{scope:'main'})],6)],[],
    ['i=1 sum=1','i=2 sum=3','i=3 sum=6','i=4 sum=10','i=5 sum=15'],
    'Condition: 6 ≤ 5 → FALSE. Loop exits!','6 > 5, loop done! Exiting.',24),

  st('fl24',10,'cout << "Final: 15"','output','green',
    [M([vr('sum','sum','int',15,'0x100',4,{scope:'main'})],10)],[],
    ['i=1 sum=1','i=2 sum=3','i=3 sum=6','i=4 sum=10','i=5 sum=15','Final: 15'],
    'Final output: sum = 15 (1+2+3+4+5)','Final answer: 15 = 1+2+3+4+5 ✓',25),

  st('fl25',11,'return 0;','return','blue',
    [M([],11,true)],[],
    ['i=1 sum=1','i=2 sum=3','i=3 sum=6','i=4 sum=10','i=5 sum=15','Final: 15'],
    'main() returns 0 — success. Program exits.','Done! return 0 means the program succeeded.',26),
];

// ─── FACTORIAL RECURSION (16 steps) ────────────────────────────────────────
export const FACTORIAL_CODE = `#include <iostream>
using namespace std;

int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}

int main() {
    int result = factorial(4);
    cout << "4! = " << result << endl;
    return 0;
}`;

export const FACTORIAL_STEPS: ExecutionStep[] = [
  st('fc0',9,'int main() {','function_call','blue',
    [fr('m','main','0x0000',9,0,[])],[],[],
    'main() starts — program entry point','Program begins!',1),
  st('fc1',10,'factorial(4) called','function_call','purple',
    [fr('m','main','0x0000',10,0,[],false),
     fr('f4','factorial','0x1000',4,1,[vr('n4','n','int',4,'0x200',4,{scope:'factorial',isNew:true})])],[],[],
    'factorial(4): new stack frame, n=4','Calling factorial(4). New memory box!',2,[],['n4']),
  st('fc2',5,'n == 0? → 4 == 0 → false','comparison','yellow',
    [fr('m','main','0x0000',10,0,[],false),
     fr('f4','factorial','0x1000',5,1,[vr('n4','n','int',4,'0x200',4,{scope:'factorial'})])],[],[],
    'n=4 ≠ 0. Not base case. Recurse deeper.','4 is not 0, go deeper!',3),
  st('fc3',6,'factorial(3) called','recursion','purple',
    [fr('m','main','0x0000',10,0,[],false),
     fr('f4','factorial','0x1000',6,1,[vr('n4','n','int',4,'0x200',4,{scope:'factorial'})],false),
     fr('f3','factorial','0x1100',4,2,[vr('n3','n','int',3,'0x300',4,{scope:'factorial',isNew:true})])],[],[],
    'factorial(3): stack depth 2, n=3','Stack depth 2 — factorial(3)!',4,[],['n3']),
  st('fc4',5,'n == 0? → 3 == 0 → false','comparison','yellow',
    [fr('m','main','0x0000',10,0,[],false),
     fr('f4','factorial','0x1000',6,1,[vr('n4','n','int',4,'0x200',4,{scope:'factorial'})],false),
     fr('f3','factorial','0x1100',5,2,[vr('n3','n','int',3,'0x300',4,{scope:'factorial'})])],[],[],
    'n=3 ≠ 0. Keep recursing.','3 is not 0!',5),
  st('fc5',6,'factorial(2) called','recursion','purple',
    [fr('m','main','0x0000',10,0,[],false),
     fr('f4','factorial','0x1000',6,1,[vr('n4','n','int',4,'0x200',4,{scope:'factorial'})],false),
     fr('f3','factorial','0x1100',6,2,[vr('n3','n','int',3,'0x300',4,{scope:'factorial'})],false),
     fr('f2','factorial','0x1200',4,3,[vr('n2','n','int',2,'0x400',4,{scope:'factorial',isNew:true})])],[],[],
    'factorial(2): stack depth 3','Stack depth 3 — factorial(2)!',6,[],['n2']),
  st('fc6',5,'n == 0? → 2 == 0 → false','comparison','yellow',
    [fr('m','main','0x0000',10,0,[],false),
     fr('f4','factorial','0x1000',6,1,[vr('n4','n','int',4,'0x200',4,{scope:'factorial'})],false),
     fr('f3','factorial','0x1100',6,2,[vr('n3','n','int',3,'0x300',4,{scope:'factorial'})],false),
     fr('f2','factorial','0x1200',5,3,[vr('n2','n','int',2,'0x400',4,{scope:'factorial'})])],[],[],
    'n=2 ≠ 0.','2 is not 0!',7),
  st('fc7',6,'factorial(1) called','recursion','purple',
    [fr('m','main','0x0000',10,0,[],false),
     fr('f4','factorial','0x1000',6,1,[vr('n4','n','int',4,'0x200',4,{scope:'factorial'})],false),
     fr('f3','factorial','0x1100',6,2,[vr('n3','n','int',3,'0x300',4,{scope:'factorial'})],false),
     fr('f2','factorial','0x1200',6,3,[vr('n2','n','int',2,'0x400',4,{scope:'factorial'})],false),
     fr('f1','factorial','0x1300',4,4,[vr('n1','n','int',1,'0x500',4,{scope:'factorial',isNew:true})])],[],[],
    'factorial(1): stack depth 4','Stack depth 4 — factorial(1)!',8,[],['n1']),
  st('fc8',5,'n == 0? → 1 == 0 → false','comparison','yellow',
    [fr('m','main','0x0000',10,0,[],false),
     fr('f4','factorial','0x1000',6,1,[vr('n4','n','int',4,'0x200',4,{scope:'factorial'})],false),
     fr('f3','factorial','0x1100',6,2,[vr('n3','n','int',3,'0x300',4,{scope:'factorial'})],false),
     fr('f2','factorial','0x1200',6,3,[vr('n2','n','int',2,'0x400',4,{scope:'factorial'})],false),
     fr('f1','factorial','0x1300',5,4,[vr('n1','n','int',1,'0x500',4,{scope:'factorial'})])],[],[],
    'n=1 ≠ 0. One more recurse.','1 is not 0!',9),
  st('fc9',6,'factorial(0) → BASE CASE!','recursion','green',
    [fr('m','main','0x0000',10,0,[],false),
     fr('f4','factorial','0x1000',6,1,[vr('n4','n','int',4,'0x200',4,{scope:'factorial'})],false),
     fr('f3','factorial','0x1100',6,2,[vr('n3','n','int',3,'0x300',4,{scope:'factorial'})],false),
     fr('f2','factorial','0x1200',6,3,[vr('n2','n','int',2,'0x400',4,{scope:'factorial'})],false),
     fr('f1','factorial','0x1300',6,4,[vr('n1','n','int',1,'0x500',4,{scope:'factorial'})],false),
     fr('f0','factorial','0x1400',5,5,[vr('n0','n','int',0,'0x600',4,{scope:'factorial'})],true,1)],[],[],
    'n=0 → BASE CASE! Return 1. Stack unwinds!','n=0! Base hit. Returning 1. Stack collapses now!',10),
  st('fc10',6,'return 1*1 = 1 → factorial(1)=1','return','green',
    [fr('m','main','0x0000',10,0,[],false),
     fr('f4','factorial','0x1000',6,1,[vr('n4','n','int',4,'0x200',4,{scope:'factorial'})],false),
     fr('f3','factorial','0x1100',6,2,[vr('n3','n','int',3,'0x300',4,{scope:'factorial'})],false),
     fr('f2','factorial','0x1200',6,3,[vr('n2','n','int',2,'0x400',4,{scope:'factorial'})],false),
     fr('f1','factorial','0x1300',6,4,[vr('n1','n','int',1,'0x500',4,{scope:'factorial'})],true,1)],[],[],
    'factorial(1) = 1×1 = 1. Frame popped.','1 × 1 = 1. Stack shrinks!',11),
  st('fc11',6,'return 2*1 = 2 → factorial(2)=2','return','green',
    [fr('m','main','0x0000',10,0,[],false),
     fr('f4','factorial','0x1000',6,1,[vr('n4','n','int',4,'0x200',4,{scope:'factorial'})],false),
     fr('f3','factorial','0x1100',6,2,[vr('n3','n','int',3,'0x300',4,{scope:'factorial'})],false),
     fr('f2','factorial','0x1200',6,3,[vr('n2','n','int',2,'0x400',4,{scope:'factorial'})],true,2)],[],[],
    'factorial(2) = 2×1 = 2. Frame popped.','2 × 1 = 2!',12),
  st('fc12',6,'return 3*2 = 6 → factorial(3)=6','return','green',
    [fr('m','main','0x0000',10,0,[],false),
     fr('f4','factorial','0x1000',6,1,[vr('n4','n','int',4,'0x200',4,{scope:'factorial'})],false),
     fr('f3','factorial','0x1100',6,2,[vr('n3','n','int',3,'0x300',4,{scope:'factorial'})],true,6)],[],[],
    'factorial(3) = 3×2 = 6. Frame popped.','3 × 2 = 6!',13),
  st('fc13',6,'return 4*6 = 24 → factorial(4)=24','return','green',
    [fr('m','main','0x0000',9,0,[vr('r','result','int',24,'0x100',4,{scope:'main',isNew:true})],true,24)],[],[],
    'factorial(4) = 4×6 = 24. All frames popped. result=24.','4 × 6 = 24. Stack collapsed! result=24 ✓',14,[],['r']),
  st('fc14',11,'cout << "4! = 24"','output','green',
    [fr('m','main','0x0000',11,0,[vr('r','result','int',24,'0x100',4,{scope:'main'})])],[],
    ['4! = 24'],'Outputs "4! = 24" to console.','Printing: 4! = 24 ✓',15),
  st('fc15',12,'return 0;','return','blue',
    [fr('m','main','0x0000',12,0,[],true,0)],[],
    ['4! = 24'],'Program exits with code 0.','Done!',16),
];
