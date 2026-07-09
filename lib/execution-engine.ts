// ── CodeScope X — C++ Execution Engine ──
// Simulates C++ execution step-by-step with full state tracking

export type VarType = 'int' | 'float' | 'double' | 'char' | 'bool' | 'string' | 'pointer' | 'array';
export type StepType = 'declaration' | 'assignment' | 'comparison' | 'function_call' | 'return' | 'loop_start' | 'loop_iter' | 'loop_end' | 'output' | 'allocation' | 'deallocation' | 'branch' | 'recursion';

export interface Variable {
  id: string;
  name: string;
  type: VarType;
  value: string | number | boolean | null;
  address: string;
  size: number;
  isPointer?: boolean;
  pointsTo?: string;
  isNew?: boolean;
  isMutated?: boolean;
  scope: string;
}

export interface StackFrame {
  id: string;
  functionName: string;
  returnAddress: string;
  variables: Variable[];
  line: number;
  isActive: boolean;
  depth: number;
  returnValue?: string | number | null;
}

export interface HeapBlock {
  id: string;
  address: string;
  size: number;
  type: string;
  value: string | number | (string | number)[];
  isFreed: boolean;
  allocatedBy: string;
  isNew?: boolean;
}

export interface ExecutionStep {
  id: string;
  line: number;
  code: string;
  stepType: StepType;
  stack: StackFrame[];
  heap: HeapBlock[];
  output: string[];
  explanation: string;
  explanationBeginner: string;
  changedVars: string[];
  newVars: string[];
  highlight: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'orange';
  operationCount: number;
}

// ── Pre-built Program Traces ──
import { FOR_LOOP_CODE, FOR_LOOP_STEPS, FACTORIAL_CODE, FACTORIAL_STEPS } from './dense-traces';

export const SAMPLE_PROGRAMS: Record<string, { code: string; title: string; description: string; category: string; steps: ExecutionStep[] }> = {

  for_loop: {
    title: 'For Loop',
    description: 'Every single line traced: init → condition → body → increment → repeat',
    category: 'Basics',
    code: FOR_LOOP_CODE,
    steps: FOR_LOOP_STEPS,
  },

  factorial: {
    title: 'Factorial (Recursion)',
    description: 'Recursive factorial(4) — every call, base case, and return value traced',
    category: 'Recursion',
    code: FACTORIAL_CODE,
    steps: FACTORIAL_STEPS,
  },

  fibonacci_recursion: {
    title: 'Fibonacci Recursion',
    description: 'Recursive computation of Fibonacci numbers with full call stack visualization',
    category: 'Recursion',
    code: `#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

int main() {
    int result = fibonacci(5);
    cout << "fib(5) = " << result << endl;
    return 0;
}`,
    steps: [
      { id: 's0', line: 9, code: 'int result = fibonacci(5);', stepType: 'function_call', highlight: 'blue',
        stack: [{ id: 'main', functionName: 'main', returnAddress: '0x0000', variables: [], line: 9, isActive: true, depth: 0 }],
        heap: [], output: [], operationCount: 1,
        explanation: 'Calling fibonacci(5) — pushing main frame onto call stack',
        explanationBeginner: 'We start by asking "what is the 5th Fibonacci number?" — a new function call begins.',
        changedVars: [], newVars: [] },
      { id: 's1', line: 4, code: 'int fibonacci(int n) { // n=5', stepType: 'function_call', highlight: 'purple',
        stack: [
          { id: 'main', functionName: 'main', returnAddress: '0x0000', variables: [], line: 9, isActive: false, depth: 0 },
          { id: 'fib5', functionName: 'fibonacci', returnAddress: '0x1000', variables: [{ id: 'n5', name: 'n', type: 'int', value: 5, address: '0x1004', size: 4, scope: 'fibonacci', isNew: true }], line: 4, isActive: true, depth: 1 }
        ],
        heap: [], output: [], operationCount: 2,
        explanation: 'fibonacci(5) called — new stack frame created with n=5',
        explanationBeginner: 'A new "box" is created in memory for fibonacci(5). It has its own variable n=5.',
        changedVars: [], newVars: ['n5'] },
      { id: 's2', line: 5, code: 'if (n <= 1) return n; // 5 <= 1 is false', stepType: 'comparison', highlight: 'blue',
        stack: [
          { id: 'main', functionName: 'main', returnAddress: '0x0000', variables: [], line: 9, isActive: false, depth: 0 },
          { id: 'fib5', functionName: 'fibonacci', returnAddress: '0x1000', variables: [{ id: 'n5', name: 'n', type: 'int', value: 5, address: '0x1004', size: 4, scope: 'fibonacci' }], line: 5, isActive: true, depth: 1 }
        ],
        heap: [], output: [], operationCount: 3,
        explanation: 'Checking base case: 5 ≤ 1 → false. Continue to recursive calls.',
        explanationBeginner: 'Is n=5 small enough to stop? No! 5 is bigger than 1, so we need to keep going.',
        changedVars: [], newVars: [] },
      { id: 's3', line: 6, code: 'return fibonacci(n-1) + fibonacci(n-2); // fibonacci(4)', stepType: 'recursion', highlight: 'purple',
        stack: [
          { id: 'main', functionName: 'main', returnAddress: '0x0000', variables: [], line: 9, isActive: false, depth: 0 },
          { id: 'fib5', functionName: 'fibonacci', returnAddress: '0x1000', variables: [{ id: 'n5', name: 'n', type: 'int', value: 5, address: '0x1004', size: 4, scope: 'fibonacci' }], line: 6, isActive: false, depth: 1 },
          { id: 'fib4', functionName: 'fibonacci', returnAddress: '0x1100', variables: [{ id: 'n4', name: 'n', type: 'int', value: 4, address: '0x1104', size: 4, scope: 'fibonacci', isNew: true }], line: 4, isActive: true, depth: 2 }
        ],
        heap: [], output: [], operationCount: 4,
        explanation: 'fibonacci(4) called recursively — stack grows deeper (depth: 2)',
        explanationBeginner: 'To find fib(5), we need fib(4) first. The stack is getting taller!',
        changedVars: [], newVars: ['n4'] },
      { id: 's4', line: 6, code: 'fibonacci(3) called', stepType: 'recursion', highlight: 'purple',
        stack: [
          { id: 'main', functionName: 'main', returnAddress: '0x0000', variables: [], line: 9, isActive: false, depth: 0 },
          { id: 'fib5', functionName: 'fibonacci', returnAddress: '0x1000', variables: [{ id: 'n5', name: 'n', type: 'int', value: 5, address: '0x1004', size: 4, scope: 'fibonacci' }], line: 6, isActive: false, depth: 1 },
          { id: 'fib4', functionName: 'fibonacci', returnAddress: '0x1100', variables: [{ id: 'n4', name: 'n', type: 'int', value: 4, address: '0x1104', size: 4, scope: 'fibonacci' }], line: 6, isActive: false, depth: 2 },
          { id: 'fib3', functionName: 'fibonacci', returnAddress: '0x1200', variables: [{ id: 'n3', name: 'n', type: 'int', value: 3, address: '0x1204', size: 4, scope: 'fibonacci', isNew: true }], line: 4, isActive: true, depth: 3 }
        ],
        heap: [], output: [], operationCount: 5,
        explanation: 'fibonacci(3) called — stack depth: 3',
        explanationBeginner: 'We keep going deeper... fib(5) needs fib(4), which needs fib(3)!',
        changedVars: [], newVars: ['n3'] },
      { id: 's5', line: 5, code: 'if (n <= 1) // n=1 → true, return 1', stepType: 'return', highlight: 'green',
        stack: [
          { id: 'main', functionName: 'main', returnAddress: '0x0000', variables: [], line: 9, isActive: false, depth: 0 },
          { id: 'fib5', functionName: 'fibonacci', returnAddress: '0x1000', variables: [{ id: 'n5', name: 'n', type: 'int', value: 5, address: '0x1004', size: 4, scope: 'fibonacci' }], line: 6, isActive: false, depth: 1 },
          { id: 'fib4', functionName: 'fibonacci', returnAddress: '0x1100', variables: [{ id: 'n4', name: 'n', type: 'int', value: 4, address: '0x1104', size: 4, scope: 'fibonacci' }], line: 6, isActive: false, depth: 2 },
          { id: 'fib3', functionName: 'fibonacci', returnAddress: '0x1200', variables: [{ id: 'n3', name: 'n', type: 'int', value: 3, address: '0x1204', size: 4, scope: 'fibonacci' }], line: 6, isActive: false, depth: 3 },
          { id: 'fib1', functionName: 'fibonacci', returnAddress: '0x1300', variables: [{ id: 'n1', name: 'n', type: 'int', value: 1, address: '0x1304', size: 4, scope: 'fibonacci', isNew: true }], line: 5, isActive: true, depth: 4, returnValue: 1 }
        ],
        heap: [], output: [], operationCount: 8,
        explanation: 'Base case hit! fibonacci(1) → returns 1. Frame popped from stack.',
        explanationBeginner: 'We finally hit the bottom! fib(1) = 1. Now we start coming back up.',
        changedVars: [], newVars: [] },
      { id: 's6', line: 9, code: 'int result = fibonacci(5); // result = 5', stepType: 'assignment', highlight: 'green',
        stack: [{ id: 'main', functionName: 'main', returnAddress: '0x0000', variables: [{ id: 'res', name: 'result', type: 'int', value: 5, address: '0x0800', size: 4, scope: 'main', isNew: true }], line: 9, isActive: true, depth: 0 }],
        heap: [], output: [], operationCount: 15,
        explanation: 'All recursive calls resolved. result = 5 assigned in main.',
        explanationBeginner: 'All the recursion is done! We now know fib(5) = 5, and store it in result.',
        changedVars: [], newVars: ['res'] },
      { id: 's7', line: 10, code: 'cout << "fib(5) = " << result << endl;', stepType: 'output', highlight: 'green',
        stack: [{ id: 'main', functionName: 'main', returnAddress: '0x0000', variables: [{ id: 'res', name: 'result', type: 'int', value: 5, address: '0x0800', size: 4, scope: 'main' }], line: 10, isActive: true, depth: 0 }],
        heap: [], output: ['fib(5) = 5'], operationCount: 16,
        explanation: 'Output: "fib(5) = 5" printed to console.',
        explanationBeginner: 'We print the answer! The 5th Fibonacci number is 5. ✓',
        changedVars: [], newVars: [] },
    ]
  },

  bubble_sort: {
    title: 'Bubble Sort',
    description: 'Classic O(n²) sorting algorithm with element swap visualization',
    category: 'Sorting',
    code: `#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22};
    int n = 5;
    bubbleSort(arr, n);
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
    return 0;
}`,
    steps: [
      { id: 'bs0', line: 16, code: 'int arr[] = {64, 34, 25, 12, 22};', stepType: 'declaration', highlight: 'green',
        stack: [{ id: 'main', functionName: 'main', returnAddress: '0x0000',
          variables: [{ id: 'arr', name: 'arr', type: 'array', value: '0x0820', address: '0x0820', size: 20, scope: 'main', isNew: true }],
          line: 16, isActive: true, depth: 0 }],
        heap: [], output: [], operationCount: 1,
        explanation: 'Array declared: {64, 34, 25, 12, 22} stored in contiguous memory at 0x0820',
        explanationBeginner: 'We create 5 boxes in memory, each holding a number. They sit next to each other!',
        changedVars: [], newVars: ['arr'] },
      { id: 'bs1', line: 5, code: 'for (int i = 0; i < n-1; i++) // i=0', stepType: 'loop_start', highlight: 'blue',
        stack: [
          { id: 'main', functionName: 'main', returnAddress: '0x0000', variables: [
            { id: 'arr', name: 'arr', type: 'array', value: '0x0820', address: '0x0820', size: 20, scope: 'main' },
            { id: 'n', name: 'n', type: 'int', value: 5, address: '0x0810', size: 4, scope: 'main' }
          ], line: 17, isActive: false, depth: 0 },
          { id: 'bsort', functionName: 'bubbleSort', returnAddress: '0x1000', variables: [
            { id: 'i', name: 'i', type: 'int', value: 0, address: '0x1008', size: 4, scope: 'bubbleSort', isNew: true },
            { id: 'j', name: 'j', type: 'int', value: 0, address: '0x100C', size: 4, scope: 'bubbleSort', isNew: true },
          ], line: 5, isActive: true, depth: 1 }
        ],
        heap: [], output: [], operationCount: 2,
        explanation: 'Outer loop begins: i=0. Pass 1 — largest element will bubble to the end.',
        explanationBeginner: 'The outer loop controls how many times we scan through the array. First pass starts!',
        changedVars: [], newVars: ['i'] },
      { id: 'bs2', line: 7, code: 'if (arr[0]=64 > arr[1]=34) → swap!', stepType: 'comparison', highlight: 'yellow',
        stack: [
          { id: 'main', functionName: 'main', returnAddress: '0x0000', variables: [
            { id: 'arr', name: 'arr', type: 'array', value: '0x0820', address: '0x0820', size: 20, scope: 'main' }
          ], line: 17, isActive: false, depth: 0 },
          { id: 'bsort', functionName: 'bubbleSort', returnAddress: '0x1000', variables: [
            { id: 'i', name: 'i', type: 'int', value: 0, address: '0x1008', size: 4, scope: 'bubbleSort' },
            { id: 'j', name: 'j', type: 'int', value: 0, address: '0x100C', size: 4, scope: 'bubbleSort', isMutated: true },
            { id: 'temp', name: 'temp', type: 'int', value: 64, address: '0x1010', size: 4, scope: 'bubbleSort', isNew: true },
          ], line: 7, isActive: true, depth: 1 }
        ],
        heap: [], output: [], operationCount: 4,
        explanation: 'arr[0]=64 > arr[1]=34 → true. Swapping! temp=64, arr[0]=34, arr[1]=64',
        explanationBeginner: '64 is bigger than 34, so they swap places. The big number "bubbles up"!',
        changedVars: ['arr'], newVars: ['temp'] },
      { id: 'bs3', line: 19, code: 'for (int i=0;i<n;i++) cout << arr[i]', stepType: 'output', highlight: 'green',
        stack: [{ id: 'main', functionName: 'main', returnAddress: '0x0000', variables: [
          { id: 'arr', name: 'arr', type: 'array', value: '0x0820', address: '0x0820', size: 20, scope: 'main' },
          { id: 'n', name: 'n', type: 'int', value: 5, address: '0x0810', size: 4, scope: 'main' }
        ], line: 19, isActive: true, depth: 0 }],
        heap: [], output: ['12 22 25 34 64 '], operationCount: 25,
        explanation: 'Sorting complete! Array is now sorted in ascending order: 12 22 25 34 64',
        explanationBeginner: 'After all the swaps, the array is perfectly sorted from smallest to largest! ✓',
        changedVars: [], newVars: [] },
    ]
  },

  linked_list: {
    title: 'Linked List',
    description: 'Dynamic linked list with heap allocation and pointer visualization',
    category: 'Data Structures',
    code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

Node* createNode(int val) {
    Node* n = new Node();
    n->data = val;
    n->next = nullptr;
    return n;
}

int main() {
    Node* head = createNode(1);
    head->next = createNode(2);
    head->next->next = createNode(3);
    
    // Traverse
    Node* curr = head;
    while (curr != nullptr) {
        cout << curr->data << " -> ";
        curr = curr->next;
    }
    cout << "null" << endl;
    return 0;
}`,
    steps: [
      { id: 'll0', line: 17, code: 'Node* head = createNode(1);', stepType: 'allocation', highlight: 'orange',
        stack: [{ id: 'main', functionName: 'main', returnAddress: '0x0000',
          variables: [{ id: 'head', name: 'head', type: 'pointer', value: '0x2000', address: '0x0800', size: 8, scope: 'main', isPointer: true, pointsTo: '0x2000', isNew: true }],
          line: 17, isActive: true, depth: 0 }],
        heap: [{ id: 'node1', address: '0x2000', size: 16, type: 'Node', value: [1, 0], isFreed: false, allocatedBy: 'createNode', isNew: true }],
        output: [], operationCount: 3,
        explanation: 'new Node() allocated on heap at 0x2000. head pointer assigned.',
        explanationBeginner: 'We create a new Node in HEAP memory (long-term storage). head points to it!',
        changedVars: [], newVars: ['head'] },
      { id: 'll1', line: 18, code: 'head->next = createNode(2);', stepType: 'allocation', highlight: 'orange',
        stack: [{ id: 'main', functionName: 'main', returnAddress: '0x0000',
          variables: [{ id: 'head', name: 'head', type: 'pointer', value: '0x2000', address: '0x0800', size: 8, scope: 'main', isPointer: true, pointsTo: '0x2000' }],
          line: 18, isActive: true, depth: 0 }],
        heap: [
          { id: 'node1', address: '0x2000', size: 16, type: 'Node', value: [1, '0x2010'], isFreed: false, allocatedBy: 'createNode', isMutated: true },
          { id: 'node2', address: '0x2010', size: 16, type: 'Node', value: [2, 0], isFreed: false, allocatedBy: 'createNode', isNew: true }
        ],
        output: [], operationCount: 6,
        explanation: 'Second node at 0x2010. Node1.next now points to Node2 — link established!',
        explanationBeginner: 'We connect the first box to the second box using a pointer arrow! A chain forms.',
        changedVars: ['node1'], newVars: ['node2'] },
      { id: 'll2', line: 19, code: 'head->next->next = createNode(3);', stepType: 'allocation', highlight: 'orange',
        stack: [{ id: 'main', functionName: 'main', returnAddress: '0x0000',
          variables: [{ id: 'head', name: 'head', type: 'pointer', value: '0x2000', address: '0x0800', size: 8, scope: 'main', isPointer: true, pointsTo: '0x2000' }],
          line: 19, isActive: true, depth: 0 }],
        heap: [
          { id: 'node1', address: '0x2000', size: 16, type: 'Node', value: [1, '0x2010'], isFreed: false, allocatedBy: 'createNode' },
          { id: 'node2', address: '0x2010', size: 16, type: 'Node', value: [2, '0x2020'], isFreed: false, allocatedBy: 'createNode', isMutated: true },
          { id: 'node3', address: '0x2020', size: 16, type: 'Node', value: [3, 'null'], isFreed: false, allocatedBy: 'createNode', isNew: true }
        ],
        output: [], operationCount: 9,
        explanation: 'Three nodes linked: 0x2000 → 0x2010 → 0x2020 → null',
        explanationBeginner: 'Three boxes are now chained together! Node1 → Node2 → Node3 → null',
        changedVars: ['node2'], newVars: ['node3'] },
      { id: 'll3', line: 23, code: 'while (curr != nullptr) cout << curr->data', stepType: 'output', highlight: 'green',
        stack: [{ id: 'main', functionName: 'main', returnAddress: '0x0000',
          variables: [
            { id: 'head', name: 'head', type: 'pointer', value: '0x2000', address: '0x0800', size: 8, scope: 'main', isPointer: true, pointsTo: '0x2000' },
            { id: 'curr', name: 'curr', type: 'pointer', value: '0x2020', address: '0x0808', size: 8, scope: 'main', isPointer: true, pointsTo: '0x2020', isMutated: true }
          ],
          line: 24, isActive: true, depth: 0 }],
        heap: [
          { id: 'node1', address: '0x2000', size: 16, type: 'Node', value: [1, '0x2010'], isFreed: false, allocatedBy: 'createNode' },
          { id: 'node2', address: '0x2010', size: 16, type: 'Node', value: [2, '0x2020'], isFreed: false, allocatedBy: 'createNode' },
          { id: 'node3', address: '0x2020', size: 16, type: 'Node', value: [3, 'null'], isFreed: false, allocatedBy: 'createNode' }
        ],
        output: ['1 -> ', '2 -> ', '3 -> ', 'null'], operationCount: 15,
        explanation: 'Traversal complete. curr pointer walked through all 3 nodes.',
        explanationBeginner: 'We walk through the chain, printing each value: 1 → 2 → 3 → null ✓',
        changedVars: ['curr'], newVars: [] },
    ]
  }
};

export function getProgramSteps(programId: string): ExecutionStep[] {
  return SAMPLE_PROGRAMS[programId]?.steps ?? [];
}

export function getAllPrograms() {
  return Object.entries(SAMPLE_PROGRAMS).map(([id, p]) => ({ id, ...p }));
}
