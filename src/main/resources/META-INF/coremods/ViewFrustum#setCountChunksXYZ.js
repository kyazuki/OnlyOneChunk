var ASMAPI = Java.type('net.minecraftforge.coremod.api.ASMAPI');
var Opcodes = Java.type('org.objectweb.asm.Opcodes');

var mappedMethodName = ASMAPI.mapMethod('func_178159_a');

function initializeCoreMod() {
    return {
        'coremodmethod': {
            'target': {
                'type': 'METHOD',
                'class': 'net.minecraft.client.renderer.ViewFrustum',
                'methodName': mappedMethodName,
                'methodDesc': '(I)V'
            },
            'transformer': function(method) {
                var instruction = ASMAPI.findFirstInstruction(method, Opcodes.ICONST_2);
                var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
                var newInstruction = new InsnNode(Opcodes.ICONST_0);
                method.instructions.set(instruction, newInstruction);
                return method;
            }
        }
    }
}