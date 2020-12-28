var ASMAPI = Java.type('net.minecraftforge.coremod.api.ASMAPI');
var Opcodes = Java.type('org.objectweb.asm.Opcodes');

var mappedMethodName = ASMAPI.mapMethod('func_178163_a');

var floor = ASMAPI.mapMethod('func_76128_c');
var setPosition = ASMAPI.mapMethod('func_189562_a');

function initializeCoreMod() {
    return {
        'coremodmethod': {
            'target': {
                'type': 'METHOD',
                'class': 'net.minecraft.client.renderer.ViewFrustum',
                'methodName': mappedMethodName,
                'methodDesc': '(DD)V'
            },
            'transformer': function(method) {
                var instruction = ASMAPI.findFirstInstruction(method, Opcodes.DLOAD);
                var LdcInsnNode = Java.type('org.objectweb.asm.tree.LdcInsnNode');
                var newInstruction1 = new LdcInsnNode(16.0);
                var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
                var newInstruction2 = new InsnNode(Opcodes.DDIV);
                var InsnList = ASMAPI.listOf(newInstruction1, newInstruction2);
                method.instructions.insert(instruction, InsnList);
                instruction = ASMAPI.findFirstMethodCall(method, ASMAPI.MethodType.STATIC, 'net/minecraft/util/math/MathHelper', floor, '(D)I');
                var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
                newInstruction1 = new VarInsnNode(Opcodes.BIPUSH, 16);
                newInstruction2 = new InsnNode(Opcodes.IMUL);
                InsnList = ASMAPI.listOf(newInstruction1, newInstruction2);
                method.instructions.insert(instruction, InsnList);
                instruction = ASMAPI.findFirstInstructionAfter(method, Opcodes.DLOAD, 5);
                newInstruction1 = new LdcInsnNode(16.0);
                newInstruction2 = new InsnNode(Opcodes.DDIV);
                InsnList = ASMAPI.listOf(newInstruction1, newInstruction2);
                method.instructions.insert(instruction, InsnList);
                instruction = ASMAPI.findFirstMethodCallAfter(method, ASMAPI.MethodType.STATIC, 'net/minecraft/util/math/MathHelper', floor, '(D)I', 10);
                newInstruction1 = new VarInsnNode(Opcodes.BIPUSH, 16);
                newInstruction2 = new InsnNode(Opcodes.IMUL);
                InsnList = ASMAPI.listOf(newInstruction1, newInstruction2);
                method.instructions.insert(instruction, InsnList);
                instruction = ASMAPI.findFirstMethodCall(method, ASMAPI.MethodType.VIRTUAL, 'net/minecraft/client/renderer/chunk/ChunkRenderDispatcher$ChunkRender', setPosition, '(III)V');
                var instruction2 = instruction.getPrevious();
                for (var i = 0; i < 3; i++) {
                    instruction = instruction.getPrevious();
                }
                newInstruction1 = new VarInsnNode(Opcodes.ILOAD, 5);
                newInstruction2 = new VarInsnNode(Opcodes.ILOAD, 6);
                method.instructions.set(instruction, newInstruction1);
                method.instructions.set(instruction2, newInstruction2);
                return method;
            }
        }
    }
}